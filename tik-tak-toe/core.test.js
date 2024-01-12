import { describe, it } from "node:test"
import assert from "node:assert"
import { shouldThrow } from "../test/utils.js"

import { initFieldsState, insertValueOnPosition, hasWinner } from "./core.js"

describe("Initial Fields State", () => {
  it("should return an array with the same given length containing empty strings", () => {
    const result = initFieldsState(9)
    assert.strictEqual(result.length, 9)
    assert.strictEqual(result.every(r => r === ""), true)
  })

  it("should throws if a number that is not a square number", (t) => {
    shouldThrow(() => initFieldsState(8), { message: "The number should be a square number" })
  })
})

describe("Insert Value On Position", () => {
  it("should replace the value from a given position with a given value", () => {
    const arr = initFieldsState(4)
    let result = insertValueOnPosition(arr, 1, "X")
    assert.strictEqual(result[1], "X")
    result = insertValueOnPosition(result, 3, "O")
    assert.strictEqual(result[1], "X")
    assert.strictEqual(result[3], "O")
    result = insertValueOnPosition(result, 0, "X")
    assert.strictEqual(result[1], "X")
    assert.strictEqual(result[3], "O")
    assert.strictEqual(result[0], "X")
    assert.deepStrictEqual(result, ["X", "X", "", "O"])
  })

  it("should throws if the given position isn't in the range of indexes of fields array", () => {
    const arr = initFieldsState(4)
    const message = "Position should be on the range of field array indexes"
    shouldThrow(() => insertValueOnPosition(arr, -1, "X"), { message })
    shouldThrow(() => insertValueOnPosition(arr, 4, "X"), { message })
  })

  it("should throws if insert on a position that contains a value", () => {
    let arr = initFieldsState(4)
    const message = "Position already has a value"
    arr = insertValueOnPosition(arr, 1, "X")
    shouldThrow(() => insertValueOnPosition(arr, 1, "O"), { message })
  })
})

describe("Has Winner", () => {
  it("should return true if theres a winner on vertical", () => {
    const arrVertical1 = ["X", "O", "X", ""]
    let result = hasWinner(arrVertical1)
    assert.strictEqual(result, true, "arrVertical1")

    const arrVertical2 = ["X", "O", "", "O"]
    result = hasWinner(arrVertical2)
    assert.strictEqual(result, true, "arrVertical2")

    const arrVertical3 = [
      "X", "O", "X", "O", 
      "X", "O", "X", "O", 
      "X", "O", "X", "O",
      "", "", "", "O"
    ]
    result = hasWinner(arrVertical3)
    assert.strictEqual(result, true, "arrVertical3")

    const arrVertical4 = [
      "X", "O", "X", "", 
      "X", "O", "X", "", 
      "X", "O", "X", "",
      "", "", "", ""
    ]
    result = hasWinner(arrVertical4)
    assert.strictEqual(result, false, "arrVertical4")
  })

  it("should return true if theres a winner on horizontal", () => {
    const arrVertical1 = ["X", "X", "O", ""]
    let result = hasWinner(arrVertical1)
    assert.strictEqual(result, true, "arrVertical1")

    const arrVertical2 = ["X", "", "O", "O"]
    result = hasWinner(arrVertical2)
    assert.strictEqual(result, true, "arrVertical2")

    const arrVertical3 = [
      "X", "O", "X", "O", 
      "X", "X", "X", "X", 
      "X", "O", "X", "O",
      "", "", "", "O"
    ]
    result = hasWinner(arrVertical3)
    assert.strictEqual(result, true, "arrVertical3")

    const arrVertical4 = [
      "X", "O", "X", "", 
      "X", "O", "X", "", 
      "X", "O", "X", "",
      "", "", "", ""
    ]
    result = hasWinner(arrVertical4)
    assert.strictEqual(result, false, "arrVertical4")
  })

  it("should return true if theres a winner on main diagonal", () => {
    const arrVertical1 = ["X", "O", "", "X"]
    let result = hasWinner(arrVertical1)
    assert.strictEqual(result, true, "arrVertical1")

    const arrVertical2 = [
      "X", "O", "X", "", 
      "X", "X", "O", "", 
      "X", "O", "X", "",
      "", "", "", "X"
    ]
    result = hasWinner(arrVertical2)
    assert.strictEqual(result, true, "arrVertical2")

    const arrVertical3 = [
      "", "O", "X", "", 
      "X", "", "X", "", 
      "X", "O", "", "X",
      "", "", "", ""
    ]
    result = hasWinner(arrVertical3)
    assert.strictEqual(result, false, "arrVertical3")
  })

  it("should return true if theres a winner on secondary diagonal", () => {
    const arrVertical1 = ["X", "O", "O", ""]
    let result = hasWinner(arrVertical1)
    assert.strictEqual(result, true, "arrVertical1")

    const arrVertical2 = [
      "X", "O", "X", "X", 
      "X", "O", "X", "", 
      "O", "X", "X", "",
      "X", "", "", "X"
    ]
    result = hasWinner(arrVertical2)
    assert.strictEqual(result, true, "arrVertical2")

    const arrVertical3 = [
      "X", "O", "X", "", 
      "X", "O", "", "", 
      "O", "", "X", "",
      "", "", "", "X"
    ]
    result = hasWinner(arrVertical3)
    assert.strictEqual(result, false, "arrVertical3")
  })
})