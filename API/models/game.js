import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: new Date(),
    required: [true, "date is required"],
  },
  chessboard: {
    type: Array,
    required: [true, "chessboard is required"],
  },
  currentPlayer: {
    type: String,
    required: [true, "CurrentPlayer is required"],
  },
  ID: {
    type: String,
    required: [true, "ID is required"],
  },
});

const Game = mongoose.model("Game", gameSchema);

export default Game;
