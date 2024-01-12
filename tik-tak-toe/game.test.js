import { describe, it } from "node:test"
import assert from "node:assert"
import { shouldThrow } from "../test/utils.js"

import { initGameState, handlePlayerTurn } from "./game.js"

describe("Init Game State", () => {
  it.skip("should return an game instance with the initial state", () => {
    const result = initGameState(9)
    assert.strictEqual(result.fields.every(f => f === ""), true)
    assert.strictEqual(result.fields.length, 9)
    assert.strictEqual(result.isFinished, false)
    assert.strictEqual(result.playerTurn, "X")
  })
})

describe("Handle Player Turn", () => {
  it("should return an game instance with the other player turn if not finished", () => {
    const initialGame = initGameState(9)
    let result = handlePlayerTurn(initialGame, 1)
    assert.strictEqual(result.fields[1], "X")
    assert.strictEqual(result.playerTurn, "O")
    assert.strictEqual(result.isFinished, false)

    result = handlePlayerTurn(result, 8)
    assert.strictEqual(result.fields[1], "X")
    assert.strictEqual(result.fields[8], "O")
    assert.strictEqual(result.playerTurn, "X")
    assert.strictEqual(result.isFinished, false)
  })

  it("should return an game instance with the same player turn if finished", () => {
    let initialGame = initGameState(4)
    initialGame.fields = ["X", "O", "", ""]

    let result = handlePlayerTurn(initialGame, 2)
    assert.strictEqual(result.fields[2], "X")
    assert.strictEqual(result.playerTurn, "X")
    assert.strictEqual(result.isFinished, true)
  })

  it("should throws if try to insert on a position when the game was finished", () => {
    let initialGame = initGameState(4)
    initialGame.fields = ["X", "O", "", ""]

    let result = handlePlayerTurn(initialGame, 2)
    assert.strictEqual(result.fields[2], "X")
    assert.strictEqual(result.playerTurn, "X")
    assert.strictEqual(result.isFinished, true)

    shouldThrow(() => handlePlayerTurn(result, 3), { message: "The game was finished." })
  })
})