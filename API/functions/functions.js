export function movePawn(destCol, destRow, originCol, originRow, currentPlayer) {
  if (originCol === destCol) {
    if (currentPlayer === "White") {
      return Number(originRow) === 1 ? Number(originRow) + 1 === Number(destRow) || Number(originRow) + 2 === Number(destRow) : Number(originRow) !== 1 ? Number(originRow) + 1 === Number(destRow) : false;
    } else {
      return Number(originRow) === 6 ? Number(originRow) - 1 === Number(destRow) || Number(originRow) - 2 === Number(destRow) : Number(originRow) !== 6 ? Number(originRow) - 1 === Number(destRow) : false;
    }
  }
  return false;
}
export function moveRook(destCol, destRow, originCol, originRow) {
  if ((originCol === destCol && originRow !== destRow) || (originCol !== destCol && originRow === destRow)) return true;
  return false;
}
export function moveBishop(destCol, destRow, originCol, originRow) {
  return destCol - originCol === destRow - originRow || destCol - originCol === -(destRow - originRow);
}
export function moveKnight(destCol, destRow, originCol, originRow) {
  if (Number(destCol) - Number(originCol) === 2 && Number(destRow) - Number(originRow) === 1) return true;
  if (Number(destCol) - Number(originCol) === 2 && Number(destRow) - Number(originRow) === -1) return true;
  if (Number(destCol) - Number(originCol) === 1 && Number(destRow) - Number(originRow) === 2) return true;
  if (Number(destCol) - Number(originCol) === 1 && Number(destRow) - Number(originRow) === -2) return true;
  if (Number(destCol) - Number(originCol) === -2 && Number(destRow) - Number(originRow) === 1) return true;
  if (Number(destCol) - Number(originCol) === -2 && Number(destRow) - Number(originRow) === -1) return true;
  if (Number(destCol) - Number(originCol) === -1 && Number(destRow) - Number(originRow) === 2) return true;
  if (Number(destCol) - Number(originCol) === -1 && Number(destRow) - Number(originRow) === -2) return true;
  return false;
}
export function moveQueen(destCol, destRow, originCol, originRow) {
  let autorizedMove = false;
  autorizedMove = moveRook(destCol, destRow, originCol, originRow) || moveBishop(destCol, destRow, originCol, originRow);
  return autorizedMove;
}
export function moveKing(destCol, destRow, originCol, originRow, currentPlayer) {
  if (Number(destCol) - Number(originCol) === 1 && Number(destRow) - Number(originRow) === 1) return true;
  if (Number(destCol) - Number(originCol) === 1 && Number(destRow) - Number(originRow) === -1) return true;
  if (Number(destCol) - Number(originCol) === 1 && Number(destRow) - Number(originRow) === 0) return true;
  if (Number(destCol) - Number(originCol) === 0 && Number(destRow) - Number(originRow) === 1) return true;
  if (Number(destCol) - Number(originCol) === 0 && Number(destRow) - Number(originRow) === -1) return true;
  if (Number(destCol) - Number(originCol) === -1 && Number(destRow) - Number(originRow) === -1) return true;
  if (Number(destCol) - Number(originCol) === -1 && Number(destRow) - Number(originRow) === 0) return true;
  if (Number(destCol) - Number(originCol) === -1 && Number(destRow) - Number(originRow) === 1) return true;
  return false;
}
export function chessPieceMove(chessboard, destCol, destRow, originCol, originRow, currentPlayer) {
  let rightMove = false;
  switch (chessboard[originRow][originCol].name) {
    case "Pawn":
      rightMove = movePawn(destCol, destRow, originCol, originRow, currentPlayer);
      break;
    case "Rook":
      rightMove = moveRook(destCol, destRow, originCol, originRow);
      break;
    case "Bishop":
      rightMove = moveBishop(destCol, destRow, originCol, originRow);
      break;
    case "Knight":
      rightMove = moveKnight(destCol, destRow, originCol, originRow);
      break;
    case "Queen":
      rightMove = moveQueen(destCol, destRow, originCol, originRow);
      break;
    case "King":
      rightMove = moveKing(destCol, destRow, originCol, originRow, currentPlayer);
      break;
  }

  return rightMove;
}
/*export function somethingBlocksPawn(destCol, destRow, originCol, originRow, chessboard) {
  let autorizedMove = true;
  if (originCol === destCol) {
    if (currentPlayer === "White") {
      return chessboard[destRow][destCol].name===empty ||]
    } else {
      return 
    }
  }
}*/
export function somethingBlocks(destCol, destRow, originCol, originRow) {
  let autorizedMove = false;
  switch (chessboard[originRow][originCol].name) {
    case "Pawn":
      autorizedMove = movePawn(destCol, destRow, originCol, originRow, currentPlayer);
      break;
    case "Rook":
      rightMove = moveRook(destCol, destRow, originCol, originRow);
      break;
    case "Bishop":
      rightMove = moveBishop(destCol, destRow, originCol, originRow);
      break;
    case "Knight":
      rightMove = moveKnight(destCol, destRow, originCol, originRow);
      break;
    case "Queen":
      rightMove = moveQueen(destCol, destRow, originCol, originRow);
      break;
    case "King":
      rightMove = moveKing(destCol, destRow, originCol, originRow, currentPlayer);
      break;
  }

  return autorizedMove;
}
