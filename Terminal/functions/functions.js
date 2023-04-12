import readline from "readline-sync";
import moment from "moment";
import fetch from "node-fetch";

export async function callAPI(url = "", method, data = {}) {
  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (method !== "GET") options.body = JSON.stringify(data);
  const response = await fetch(url, options);
  return response.json();
}
export async function initGame() {
  let { chessboard, currentPlayer, ID } = await callAPI("http://localhost:3000/newgame", "GET").then((res) => {
    return {
      chessboard: res.chessboard,
      currentPlayer: res.currentPlayer,
      ID: Date.now(),
    };
  });
  return { chessboard, currentPlayer, ID };
}
export function displayChessboard(chessboard) {
  console.clear();
  let chessboardLine = "";
  for (let line = 7; line >= 0; line--) {
    chessboardLine = line;
    for (let column = 0; column <= 7; column++) {
      chessboardLine += " " + chessboard[line][column].symbol;
    }
    console.log(chessboardLine);
  }
  console.log("  a b c d e f g h");
}
export async function display(casePossible, currentPlayer, chessboard) {
  var origin = "";
  var destination = "";
  let autorizedMoveOrigin = false;
  let autorizedMoveDestination = false;
  do {
    displayChessboard(chessboard);
    origin = readline.question("Player " + currentPlayer + ", which piece do you want to move : ");
    autorizedMoveOrigin = await itsYourPiece(origin, currentPlayer, casePossible);
    if (autorizedMoveOrigin) {
      destination = readline.question("Player " + currentPlayer + ", where do you want to put this piece : ");
      autorizedMoveDestination = await hasTheRightToMove(destination, currentPlayer, casePossible, origin);
    }
    if (origin.toLowerCase() === "exit" || destination.toLowerCase() === "exit" || origin.toLowerCase() === "save" || destination.toLowerCase() === "save") break;
  } while (!casePossible.includes(origin.toLowerCase()) || !autorizedMoveOrigin || !casePossible.includes(destination.toLowerCase()) || !autorizedMoveDestination);
  return { origin: origin, destination: destination };
}
export async function itsYourPiece(square, currentPlayer, casePossible) {
  var autorizedMove = false;
  let url = "http://localhost:3000/itsYourPiece/?origin=" + square + "&currentPlayer=" + currentPlayer;

  if (casePossible.includes(square.toLowerCase()))
    autorizedMove = await callAPI(url, "GET").then((res) => {
      return res.res;
    });
  return autorizedMove;
}
export async function hasTheRightToMove(square, currentPlayer, casePossible, origin) {
  var autorizedMove = false;

  let url = "http://localhost:3000/checkDestination/?destination=" + square + "&origin=" + origin + "&currentPlayer=" + currentPlayer;
  if (casePossible.includes(square.toLowerCase()))
    await callAPI(url, "GET").then((res) => {
      autorizedMove = res.res;
    });
  return autorizedMove;
}
export async function movePiece(origin, destination, currentPlayer) {
  var chessboard = [];
  let url = "http://localhost:3000/movePiece/?destination=" + destination + "&origin=" + origin + "&currentPlayer=" + currentPlayer;
  await callAPI(url, "GET").then((res) => {
    chessboard = res.chessboard;
  });
  return chessboard;
}
export async function changeCurrentPlayer() {
  let url = "http://localhost:3000/changePlayer";
  let currentPlayer = await callAPI(url, "GET").then((res) => {
    return res.currentPlayer;
  });
  return currentPlayer;
}
export async function saveGame(chessboard, currentPlayer, ID) {
  let gameSaved = {};
  let url = "http://localhost:3000/save";
  await callAPI(url, "POST", { chessboard, currentPlayer, ID }).then((res) => {
    gameSaved = res;
  });
  return gameSaved;
}
export async function getGames() {
  let games = {};
  let url = "http://localhost:3000/games";
  await callAPI(url, "GET").then((res) => {
    games = res;
  });
  return games;
}
export async function getGame(ID) {
  let game = {};
  let url = "http://localhost:3000/game/?id=" + ID;
  await callAPI(url, "GET").then((res) => {
    game = res;
  });
  return game;
}
export async function displayGames(games) {
  let choice = 0;
  do {
    console.clear();
    for (let i = 1; i < 6; i++) {
      let game = games.find((game) => game.ID === i.toString());
      if (game) console.log(game.ID + " - " + moment(game.date).format("YYYY-MM-DD HH:MM:SS"));
      else console.log(i + " - empty");
    }

    choice = readline.question(`Select Game Slot : `);
  } while (!["1", "2", "3", "4", "5"].includes(choice));
  return choice;
}
