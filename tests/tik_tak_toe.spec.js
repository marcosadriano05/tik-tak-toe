import { TikTakToe, Square, Position, Player } from "../src/tik_tak_toe"

describe("Square", () => {
  it("should pass the position on creation and value is a empty string", () => {
    const square = new Square(1, 2)

    expect(square.position.row).toBe(1)
    expect(square.position.col).toBe(2)
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
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const square = Array.from(game.squares.values()).some(square => {
          return square.position.row === i && square.position.col === j && square.value === ""
        })
        expect(square).toBeTruthy()
      }
    }
  })

  it("should create a game with two players with diferent values and turn values", () => {
    const game = new TikTakToe()

    expect(game.playerOne.value).not.toEqual(game.playerTwo.value)
    expect(game.playerOne.itsTurn).not.toBe(game.playerTwo.itsTurn)
  })

  it("should set value of an selected square by position", () => {
    const game = new TikTakToe()
    game.setSquareValue(new Position(0, 2))
    game.setSquareValue(new Position(1, 1))
    game.setSquareValue(new Position(2, 0))

    expect(game.squares.get(3).value).toEqual(game.playerOne.value)
    expect(game.squares.get(5).value).toEqual(game.playerTwo.value)
    expect(game.squares.get(7).value).toEqual(game.playerOne.value)
  })

  it("should not set value of an selected square by position if it is setted before", () => {
    const game = new TikTakToe()
    game.setSquareValue(new Position(0, 2))
    game.setSquareValue(new Position(0, 2))
    
    expect(game.squares.get(3).value).toEqual(game.playerOne.value)
  })

  it("should change the players turn when set value", () => {
    const game = new TikTakToe()
    game.setSquareValue(new Position(0, 2))
    
    expect(game.playerOne.itsTurn).toBeFalsy()
    expect(game.playerTwo.itsTurn).toBeTruthy()

    game.setSquareValue(new Position(1, 2))

    expect(game.playerOne.itsTurn).toBeTruthy()
    expect(game.playerTwo.itsTurn).toBeFalsy()
  })

  it("should return the key number based on the position", () => {
    const game = new TikTakToe()

    expect(game.checkSquareKeyByPosition(new Position(0, 0))).toBe(1)
    expect(game.checkSquareKeyByPosition(new Position(0, 1))).toBe(2)
    expect(game.checkSquareKeyByPosition(new Position(0, 2))).toBe(3)
    expect(game.checkSquareKeyByPosition(new Position(1, 0))).toBe(4)
    expect(game.checkSquareKeyByPosition(new Position(1, 1))).toBe(5)
    expect(game.checkSquareKeyByPosition(new Position(1, 2))).toBe(6)
    expect(game.checkSquareKeyByPosition(new Position(2, 0))).toBe(7)
    expect(game.checkSquareKeyByPosition(new Position(2, 1))).toBe(8)
    expect(game.checkSquareKeyByPosition(new Position(2, 2))).toBe(9)
  })
})