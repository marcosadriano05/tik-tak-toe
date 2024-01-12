import { hasWinner, initFieldsState, insertValueOnPosition } from "./core.js"

/**
 * @typedef TikTakToe
 * @property {boolean} isFinished 
 * @property {('X'|'O')} playerTurn 
 * @property {string[]} fields 
 */

/**
 * Create an initial game state.
 * @param {number} fieldNumbers
 * @returns {TikTakToe}
 * @throws InvalidFieldNumberException
 */
export const initGameState = (fieldNumbers) => {
  return { fields: initFieldsState(fieldNumbers), isFinished: false, playerTurn: "X" }
}

/**
 * Handle player turn, if the game is finished, the player turn remains the same,
 * if not, the player turn is changed.
 * @param {TikTakToe} game 
 * @param {number} position
 * @returns {TikTakToe}
 */
export const handlePlayerTurn = (game, position) => {
  if (game.isFinished) {
    throw new Error("The game was finished.")
  }
  
  const updatedFields = insertValueOnPosition(game.fields, position, game.playerTurn)
  const isFinished = hasWinner(updatedFields)

  return { 
    fields: updatedFields,
    isFinished,
    playerTurn: isFinished ? game.playerTurn : changePlayerTurn(game.playerTurn)
  }
}

/**
 * Change player turn.
 * @param {('X'|'O')} player 
 * @returns {('X'|'O')}
 */
export const changePlayerTurn = (player) => {
  return player === "X" ? "O" : "X"
}