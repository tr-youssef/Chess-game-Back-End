import readline from "readline-sync";
import fetch from "node-fetch";

export async function callAPI(url = "", methode, data = {}) {
  const options = {
    method: methode,
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (methode !== "GET") options.body = { body: JSON.stringify(data) };
  const response = await fetch(url, options);
  return response.json();
}
export async function initGame() {
  let { chessboard, currentPlayer } = await callAPI(
    "http://localhost:3000/newgame",
    "GET"
  ).then((res) => {
    return {
      chessboard: res.chessboard,
      currentPlayer: res.currentPlayer,
    };
  });
  return { chessboard, currentPlayer };
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
export async function display(casePossible, currentPlayer) {
  var origin = "";
  let autorizedMove = false;
  do {
    origin = readline.question(
      "Player " + currentPlayer + ", which piece do you want to move : "
    );
    autorizedMove = await itsYourPiece(origin, currentPlayer, casePossible);
  } while (
    !casePossible.includes(origin) ||
    !casePossible.includes(origin.toLowerCase()) ||
    !autorizedMove
  );
  return origin;
}
export async function itsYourPiece(square, currentPlayer, casePossible) {
  var autorizedMove = false;
  let url =
    "http://localhost:3000/itsYourPiece/?origin=" +
    square +
    "&currentPlayer=" +
    currentPlayer;

  if (
    casePossible.includes(square) ||
    casePossible.includes(square.toLowerCase())
  )
    autorizedMove = await callAPI(url, "GET").then((res) => {
      return res.res;
    });
  return autorizedMove;
}
export async function display2(casePossible, currentPlayer, origin) {
  var destination = "";
  let autorizedMove = false;
  do {
    destination = readline.question(
      "Player " + currentPlayer + ", where do you want to put this piece : "
    );
    autorizedMove = await hasTheRightToMove(
      destination,
      currentPlayer,
      casePossible,
      origin
    );
  } while (
    !casePossible.includes(destination) ||
    !casePossible.includes(destination.toLowerCase()) ||
    !autorizedMove
  );
  return destination;
}
export async function hasTheRightToMove(
  square,
  currentPlayer,
  casePossible,
  origin
) {
  var autorizedMove = false;

  let url =
    "http://localhost:3000/checkDestination/?destination=" +
    square +
    "&origin=" +
    origin +
    "&currentPlayer=" +
    currentPlayer;
  if (
    casePossible.includes(square) ||
    casePossible.includes(square.toLowerCase())
  )
    await callAPI(url, "GET").then((res) => {
      autorizedMove = res;
    });
  return autorizedMove;
}
export async function movePiece(origin, destination, currentPlayer) {
  var chessboard = [];
  let url =
    "http://localhost:3000/movePiece/?destination=" +
    destination +
    "&origin=" +
    origin +
    "&currentPlayer=" +
    currentPlayer;
  await callAPI(url, "GET").then((res) => {
    chessboard = res.chessboard;
  });
  return chessboard;
}
export async function changePlayer() {
  let url = "http://localhost:3000/changePlayer";
  let currentPlayer = await callAPI(url, "GET").then((res) => {
    return res.currentPlayer;
  });
  return currentPlayer;
}
