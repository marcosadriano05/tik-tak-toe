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
        const square = game.squares.some(square => {
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
    game.setValue("X", new Position(0, 2))
    game.setValue("O", new Position(1, 1))
    game.setValue("X", new Position(2, 0))
    
    expect(game.squares[0, 2].value).toEqual("X")
    expect(game.squares[1, 1].value).toEqual("O")
    expect(game.squares[2, 0].value).toEqual("X")
  })

  it("should not set value of an selected square by position if it is setted before", () => {
    const game = new TikTakToe()
    game.setValue("X", new Position(0, 2))
    game.setValue("O", new Position(0, 2))
    
    expect(game.squares[0, 2].value).toEqual("X")
  })
})