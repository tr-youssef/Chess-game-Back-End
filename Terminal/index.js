import readline from "readline-sync";
import { callAPI, displayChessBoard } from "./functions/functions.js";

const casePossible = [
  "a0",
  "a1",
  "a2",
  "a3",
  "a4",
  "a5",
  "a6",
  "a7",
  "b0",
  "b1",
  "b2",
  "b3",
  "b4",
  "b5",
  "b6",
  "b7",
  "c0",
  "c1",
  "c2",
  "c3",
  "c4",
  "c5",
  "c6",
  "c7",
  "d0",
  "d1",
  "d2",
  "d3",
  "d4",
  "d5",
  "d6",
  "d7",
  "e0",
  "e1",
  "e2",
  "e3",
  "e4",
  "e5",
  "e6",
  "e7",
  "f0",
  "f1",
  "f2",
  "f3",
  "f4",
  "f5",
  "f6",
  "f7",
  "g0",
  "g1",
  "g2",
  "g3",
  "g4",
  "g5",
  "g6",
  "g7",
  "h0",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "h7",
];

do {
  var statutGame = readline.question(
    "Welcome to our chess game!  \n 1 - New game \n 2 - Resume a game \n 3 - Exit\n The answer : "
  );
  if (statutGame === "1") {
    let currentPlayer = "";
    await callAPI("http://localhost:3000/newgame", "GET").then((res) => {
      displayChessBoard(res.chessBoard);
      currentPlayer = res.currentPlayer;
    });
    do {
      var autorizedMove = false;
      var origin = readline.question(
        "Player " + currentPlayer + ", which piece do you want to move : "
      );
      //"This square does not contain your piece"
      await callAPI(
        "http://localhost:3000/checkOrigin/?origin=" +
          origin +
          "&currentPlayer=" +
          currentPlayer,
        "GET"
      ).then((res) => {
        autorizedMove = res.res;
      });
    } while (
      !casePossible.includes(origin) ||
      !casePossible.includes(origin.toLowerCase()) ||
      !autorizedMove
    );
    do {
      var autorizedMove = false;
      var destination = readline.question(
        "Player " + currentPlayer + ", where do you want to put this piece : "
      );
      await callAPI(
        "http://localhost:3000/checkDestination/?destination=" +
          destination +
          "&currentPlayer=" +
          currentPlayer,
        "GET"
      ).then((res) => {
        autorizedMove = res.res;
      });
    } while (
      !casePossible.includes(move) ||
      !casePossible.includes(move.toLowerCase()) ||
      !autorizedMove
    );

    // crée une api pour cheque si c'est possible   await callAPI("");
  }
} while (statutGame < 1 || statutGame > 3);
