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

export function displayChessBoard(chessBoard) {
  let chessBoardLine = "";
  for (let line = 7; line >= 0; line--) {
    chessBoardLine = line;
    for (let column = 0; column <= 7; column++) {
      chessBoardLine += " " + chessBoard[line][column].symbol;
    }
    console.log(chessBoardLine);
  }
  console.log("  a b c d e f g h");
}
