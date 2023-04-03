export function movePawn(destCol, destRow, originCol, originRow, currentPlayer, chessboard) {
  if (originCol === destCol) {
    if (currentPlayer === "White") {
      return originRow === 1 ? originRow + 1 === destRow || originRow + 2 === destRow : originRow !== 1 ? originRow + 1 === destRow : false;
    } else {
      return originRow === 6 ? originRow - 1 === destRow || originRow - 2 === destRow : originRow !== 6 ? originRow - 1 === destRow : false;
    }
  } else if (originCol === destCol - 1 || originCol === destCol + 1) {
    if (currentPlayer === "White" && originRow === destRow - 1) {
      if (chessboard[destRow][destCol].color === "Black") return true;
    } else if (currentPlayer === "Black" && originRow === destRow + 1) {
      if (chessboard[destRow][destCol].color === "White") return true;
    }
  }
  return false;
}
export function somethingBlocksPawn(destCol, destRow, originCol, originRow, chessboard, currentPlayer) {
  let autorizedMove = true;
  if (originCol === destCol) {
    for (let i = currentPlayer === "White" ? originRow + 1 : originRow - 1; currentPlayer === "White" ? i <= destRow : i >= destRow; currentPlayer === "White" ? i++ : i--) {
      if (chessboard[i][originCol].color !== "empty") autorizedMove = false;
    }
  }
  return autorizedMove;
}
export function moveRook(destCol, destRow, originCol, originRow) {
  if ((originCol === destCol && originRow !== destRow) || (originCol !== destCol && originRow === destRow)) return true;
  return false;
}
export function somethingBlocksRook(destCol, destRow, originCol, originRow, chessboard) {
  let autorizedMove = true;
  if (originCol === destCol) {
    for (let i = originRow <= destRow ? originRow + 1 : originRow - 1; originRow <= destRow ? i <= destRow - 1 : i >= destRow + 1; originRow <= destRow ? i++ : i--) {
      if (chessboard[i][originCol].color !== "empty") autorizedMove = false;
    }
  } else if (originRow === destRow) {
    for (let i = originCol <= destCol ? originCol + 1 : originCol - 1; originCol <= destCol ? i <= destCol - 1 : i >= destCol + 1; originCol <= destCol ? i++ : i--) {
      if (chessboard[originRow][i].color !== "empty") autorizedMove = false;
    }
  }

  return autorizedMove;
}
export function moveBishop(destCol, destRow, originCol, originRow) {
  return destCol - originCol === destRow - originRow || destCol - originCol === -(destRow - originRow);
}
export function somethingBlocksBishop(destCol, destRow, originCol, originRow, chessboard) {
  let autorizedMove = true;
  let j = originCol <= destCol ? originCol + 1 : originCol - 1;
  for (let i = originRow <= destRow ? originRow + 1 : originRow - 1; originRow <= destRow ? i <= destRow - 1 : i >= destRow + 1; originRow <= destRow ? i++ : i--) {
    if (chessboard[i][j].color !== "empty") autorizedMove = false;
    Number(originCol) <= Number(destCol) ? j++ : j--;
  }
  return autorizedMove;
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
export function somethingBlocksKnight() {
  let autorizedMove = true;
  return autorizedMove;
}
export function moveQueen(destCol, destRow, originCol, originRow) {
  let autorizedMove = false;
  autorizedMove = moveRook(destCol, destRow, originCol, originRow) || moveBishop(destCol, destRow, originCol, originRow);
  return autorizedMove;
}
export function somethingBlocksQueen(destCol, destRow, originCol, originRow, chessboard) {
  let autorizedMove = true;
  if (destCol === originCol || destRow === originRow) {
    console.log("rook");
    autorizedMove = somethingBlocksRook(destCol, destRow, originCol, originRow, chessboard);
  } else {
    autorizedMove = somethingBlocksBishop(destCol, destRow, originCol, originRow, chessboard);
    console.log("bishop");
  }
  return autorizedMove;
}
export function moveKing(destCol, destRow, originCol, originRow) {
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
export function somethingBlocksKing() {
  let autorizedMove = true;
  return autorizedMove;
}
export function chessPieceMove(chessboard, destCol, destRow, originCol, originRow, currentPlayer) {
  let rightMove = false;
  switch (chessboard[originRow][originCol].name) {
    case "Pawn":
      rightMove = movePawn(destCol, destRow, originCol, originRow, currentPlayer, chessboard);
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
export function somethingBlocks(destCol, destRow, originCol, originRow, chessboard, currentPlayer) {
  let autorizedMove = false;
  switch (chessboard[originRow][originCol].name) {
    case "Pawn":
      autorizedMove = somethingBlocksPawn(destCol, destRow, originCol, originRow, chessboard, currentPlayer);
      break;
    case "Rook":
      autorizedMove = somethingBlocksRook(destCol, destRow, originCol, originRow, chessboard);
      break;
    case "Bishop":
      autorizedMove = somethingBlocksBishop(destCol, destRow, originCol, originRow, chessboard);
      break;
    case "Knight":
      autorizedMove = somethingBlocksKnight();
      break;
    case "Queen":
      autorizedMove = somethingBlocksQueen(destCol, destRow, originCol, originRow, chessboard);
      break;
    case "King":
      autorizedMove = somethingBlocksKing();
      break;
  }

  return autorizedMove;
}
