import { TikTakToe, Square, Player } from "../src/tik_tak_toe"

describe("Square", () => {
  it("should pass the position on creation and value is a empty string", () => {
    const square = new Square()

    expect(square.value).toEqual("")
  })
})

describe("Player", () => {
  it("should pass the value and if is the game turn", () => {
    const player = new Player("X", true)

    expect(player.value).toEqual("X")
    expect(player.winner).toBeFalsy()
    expect(player.itsTurn).toBeTruthy()
  })
})

describe("TikTakToe", () => {
  it("should fill all squares on creation", () => {
    const game = new TikTakToe()
    const squaresCreated = Array.from(game.squares.values())
    const hasEmptyString = squaresCreated.every(square => square.value === "")
    
    expect(squaresCreated.length).toBe(9)
    expect(hasEmptyString).toBeTruthy()
  })

  it("should create a game with two players with diferent values and turn values", () => {
    const game = new TikTakToe()

    expect(game.playerOne.value).not.toEqual(game.playerTwo.value)
    expect(game.playerOne.itsTurn).not.toBe(game.playerTwo.itsTurn)
  })

  it("should set value of an selected square by position", () => {
    const game = new TikTakToe()
    game.setSquareValue(3)
    game.setSquareValue(5)
    game.setSquareValue(7)

    expect(game.squares.get(3).value).toEqual(game.playerOne.value)
    expect(game.squares.get(5).value).toEqual(game.playerTwo.value)
    expect(game.squares.get(7).value).toEqual(game.playerOne.value)
  })

  it("should not set value of an selected square by position if it is setted before", () => {
    const game = new TikTakToe()
    game.setSquareValue(3)
    game.setSquareValue(3)
    
    expect(game.squares.get(3).value).toEqual(game.playerOne.value)
  })

  it("should change the players turn when set value", () => {
    const game = new TikTakToe()
    game.setSquareValue(3)
    
    expect(game.playerOne.itsTurn).toBeFalsy()
    expect(game.playerTwo.itsTurn).toBeTruthy()

    game.setSquareValue(6)

    expect(game.playerOne.itsTurn).toBeTruthy()
    expect(game.playerTwo.itsTurn).toBeFalsy()
  })

  it("should check end game returns true if horizontal lines have the same value", () => {
    let game = new TikTakToe()
    game.setSquareValue(2)
    game.setSquareValue(5)
    game.setSquareValue(3)
    game.setSquareValue(6)
    game.setSquareValue(1)

    expect(game.checkEndGame()).toBeTruthy()

    game = new TikTakToe()
    game.setSquareValue(2)
    game.setSquareValue(5)
    game.setSquareValue(8)
    game.setSquareValue(6)
    game.setSquareValue(9)

    expect(game.checkEndGame()).toBeFalsy()
  })
})