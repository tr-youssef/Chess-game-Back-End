import express from "express";
const app = express();
const port = 3000;
import { initChessboard, letterToNumber } from "./data.js";
import { movePawn, moveRook } from "./functions/functions.js";

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
  const empty = chessboard[destRow][destCol].name === "Square";
  const differentColor = chessboard[destRow][destCol].color !== currentPlayer;
  let rightMove = false;

  switch (chessboard[originRow][originCol].name) {
    case "Pawn":
      rightMove = movePawn(destCol, destRow, originCol, originRow, currentPlayer);
      break;
    case "Rook":
      rightMove = moveRook(destCol, destRow, originCol, originRow);
      break;
  }
  res.send({ res: empty && differentColor && rightMove });
});
app.get("/movePiece", (req, res) => {
  const destCol = letterToNumber.indexOf(req.query.destination[0].toLowerCase());
  const destRow = req.query.destination[1];
  const originCol = letterToNumber.indexOf(req.query.origin[0].toLowerCase());
  const originRow = req.query.origin[1];
  const storage = chessboard[destRow][destCol];
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
