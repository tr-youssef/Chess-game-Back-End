import readline from "readline-sync";
import {
  displayChessboard,
  initGame,
  display,
  display2,
  movePiece,
} from "./functions/functions.js";

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
  console.clear();
  let end = false;
  var statutGame = readline.question(
    "Welcome to our chess game!  \n 1 - New game \n 2 - Resume a game \n 3 - Exit\n The answer : "
  );
  if (statutGame === "1") {
    let { chessboard, currentPlayer } = await initGame();

    displayChessboard(chessboard);

    do {
      let origin = await display(casePossible, currentPlayer);
      let destination = await display2(casePossible, currentPlayer, origin);
      chessboard = await movePiece(origin, destination, currentPlayer);
      displayChessboard(chessboard);
    } while (!end);
  }
  //console.clear();
} while (statutGame !== "1" && statutGame !== "2" && statutGame !== "3");
