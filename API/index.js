import express from "express";
const app = express();
const port = 3000;
import { initChessboard, letterToNumber } from "./data.js";
import { chessPieceMove, somethingBlocks } from "./functions/functions.js";

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
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
