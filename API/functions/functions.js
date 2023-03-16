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
