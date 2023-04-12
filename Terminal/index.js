import readline from "readline-sync";
import { initGame, display, movePiece, changeCurrentPlayer, saveGame, getGames, displayGames, getGame } from "./functions/functions.js";

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
  let chessboard = [];
  let currentPlayer = "";
  var statutGame = readline.question("Welcome to our chess game!  \n 1 - New game \n 2 - Resume a game \n 3 - Exit\n The answer : ");
  if (statutGame === "3") {
    break;
  } else if (statutGame === "1") {
    let initgame = await initGame();
    chessboard = initgame.chessboard;
    currentPlayer = initgame.currentPlayer;
  } else if (statutGame === "2") {
    let games = await getGames();
    let ID = await displayGames(games);
    let game = await getGame(ID);
    chessboard = game.chessboard;
    currentPlayer = game.currentPlayer;
  }
  do {
    let { origin, destination } = await display(casePossible, currentPlayer, chessboard);
    if (origin === "exit" || destination === "exit") break;
    else if (origin.toLowerCase() === "save" || destination.toLowerCase() === "save") {
      let games = await getGames();
      let ID = await displayGames(games);
      let savedGame = await saveGame(chessboard, currentPlayer, ID);
    } else {
      chessboard = await movePiece(origin, destination, currentPlayer);
      currentPlayer = await changeCurrentPlayer(currentPlayer);
    }
  } while (!end);
  console.clear();
} while (statutGame !== "1" && statutGame !== "2" && statutGame !== "3");
