import express from "express";
import dotenv from "dotenv";
import Game from "./models/game.js";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

import { initChessboard, letterToNumber } from "./data.js";
import { chessPieceMove, somethingBlocks } from "./functions/functions.js";

let db = await mongoose.connect(process.env.DB_URL);

let chessboard = [];
let currentPlayer = "";

app.get("/newgame", (req, res) => {
  chessboard = initChessboard();
  currentPlayer = "White";
  res.send({ chessboard: chessboard, currentPlayer: currentPlayer });
});
app.get("/itsYourPiece", (req, res) => {
  const col = letterToNumber.indexOf(req.query.origin[0].toLowerCase());
  const row = req.query.origin[1];
  const currentPlayer = req.query.currentPlayer;
  res.send({ res: chessboard[row][col].color === currentPlayer });
});
app.get("/checkDestination", (req, res) => {
  const destCol = letterToNumber.indexOf(req.query.destination[0].toLowerCase());
  const destRow = req.query.destination[1];
  const originCol = letterToNumber.indexOf(req.query.origin[0].toLowerCase());
  const originRow = req.query.origin[1];
  const currentPlayer = req.query.currentPlayer;
  let differentColor = false;
  let thisChessPieceMove = false;
  let thisChessPieceBlock = false;
  differentColor = chessboard[destRow][destCol].color !== currentPlayer;
  if (differentColor) {
    thisChessPieceMove = chessPieceMove(chessboard, Number(destCol), Number(destRow), Number(originCol), Number(originRow), currentPlayer);
    if (thisChessPieceMove) thisChessPieceBlock = somethingBlocks(Number(destCol), Number(destRow), Number(originCol), Number(originRow), chessboard, currentPlayer);
  }
  res.send({ res: differentColor && thisChessPieceMove && thisChessPieceBlock });
});
app.get("/movePiece", (req, res) => {
  const destCol = letterToNumber.indexOf(req.query.destination[0].toLowerCase());
  const destRow = req.query.destination[1];
  const originCol = letterToNumber.indexOf(req.query.origin[0].toLowerCase());
  const originRow = req.query.origin[1];
  let storage = chessboard[destRow][destCol];
  if (chessboard[destRow][destCol].color !== chessboard[originRow][originCol].color && chessboard[destRow][destCol].color !== "empty")
    storage = {
      name: "Square",
      color: "empty",
      symbol: "*",
    };
  chessboard[destRow][destCol] = chessboard[originRow][originCol];
  chessboard[originRow][originCol] = storage;
  res.send({ chessboard: chessboard });
});
app.get("/changePlayer", (req, res) => {
  currentPlayer === "White" ? (currentPlayer = "Black") : (currentPlayer = "White");
  res.send({ currentPlayer: currentPlayer });
});
app.post("/save", async (req, res) => {
  const { chessboard, currentPlayer, ID } = req.body;
  try {
    const existingGame = await Game.findOne({
      ID: ID,
    });
    if (!existingGame) {
      const gameSaved = await Game.create({
        ID: ID,
        date: new Date().toISOString(),
        chessboard: chessboard,
        currentPlayer: currentPlayer,
      });
      res.status(201).json(gameSaved);
    } else {
      const oldGame = await Game.updateOne(
        {
          _id: existingGame._id,
        },
        {
          date: new Date().toISOString(),
          ID: ID,
          chessboard: chessboard,
          currentPlayer: currentPlayer,
        }
      );
      if (oldGame.modifiedCount > 0) {
        const gameUpdated = await Game.findOne({
          _id: existingGame._id,
        });
        res.status(201).json(gameUpdated);
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get("/games", async (req, res) => {
  try {
    const games = await Game.find({});
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get("/game", async (req, res) => {
  const { id } = req.query;

  try {
    const game = await Game.findOne({ ID: id });
    chessboard = game.chessboard;
    currentPlayer = game.currentPlayer;
    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
