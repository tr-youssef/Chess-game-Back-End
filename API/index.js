import express from "express";
const app = express();
const port = 3000;
import { defaultChessBoard, letterToNumber } from "./data.js";

let chessBoard = defaultChessBoard; //[];
let currentPlayer = "";

app.get("/newgame", (req, res) => {
  chessBoard = defaultChessBoard;
  currentPlayer = "White";
  res.send({ chessBoard: chessBoard, currentPlayer: currentPlayer });
});

app.get("/checkOrigin", (req, res) => {
  const col = letterToNumber.indexOf(req.query.origin[0].toLowerCase());
  const row = req.query.origin[1];
  const currentPlayer = req.query.currentPlayer;
  res.send({ res: chessBoard[row][col].color === currentPlayer });
});

app.get("/checkDestination", (req, res) => {
  const col = letterToNumber.indexOf(req.query.origin[0].toLowerCase());
  const row = req.query.origin[1];
  const currentPlayer = req.query.currentPlayer;
  res.send({ res: chessBoard[row][col].color === currentPlayer });
});

app.get("/", (req, res) => {
  res.send({ post: "post" });
});
app.get("/test", (req, res) => {
  res.send({ test1: "test1" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
