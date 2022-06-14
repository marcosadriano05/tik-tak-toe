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
    expect(player.winner).toBe(false)
    expect(player.itsTurn).toBe(true)
  })
})

describe("TikTakToe", () => {
  let game

  beforeEach(() => {
    game = new TikTakToe()
  })

  const setupUnfinishedGame = () => {
    game.setSquareValue(2)
    game.setSquareValue(5)
    game.setSquareValue(8)
    game.setSquareValue(6)
    game.setSquareValue(9)
  }

  const setupFinishedGameWithHorizontalLines = () => {
    game.setSquareValue(2)
    game.setSquareValue(5)
    game.setSquareValue(3)
    game.setSquareValue(6)
    game.setSquareValue(1)
  }

  const setupFinishedGameWithVerticalLines = () => {
    game.setSquareValue(1)
    game.setSquareValue(2)
    game.setSquareValue(4)
    game.setSquareValue(3)
    game.setSquareValue(7)
  }

  const setupFinishedGameWithPrincipalDiagonalLine = () => {
    game.setSquareValue(1)
    game.setSquareValue(2)
    game.setSquareValue(5)
    game.setSquareValue(3)
    game.setSquareValue(9)
  }

  const setupFinishedGameWithSecondaryDiagonalLine = () => {
    game.setSquareValue(3)
    game.setSquareValue(2)
    game.setSquareValue(5)
    game.setSquareValue(1)
    game.setSquareValue(7)
  }

  const setupDrawGame = () => {
    game.setSquareValue(3)
    game.setSquareValue(1)
    game.setSquareValue(2)
    game.setSquareValue(6)
    game.setSquareValue(4)
    game.setSquareValue(5)
    game.setSquareValue(9)
    game.setSquareValue(7)
    game.setSquareValue(8)
  }

  const setupFinishedGameWithAllSquaresFilled = () => {
    game.setSquareValue(3)
    game.setSquareValue(1)
    game.setSquareValue(2)
    game.setSquareValue(6)
    game.setSquareValue(4)
    game.setSquareValue(5)
    game.setSquareValue(7)
    game.setSquareValue(9)
    game.setSquareValue(8)
  }

  it("should fill all squares on creation", () => {
    const squaresCreated = Array.from(game.squares.values())
    const hasEmptyString = squaresCreated.every(square => square.value === "")

    expect(squaresCreated.length).toBe(9)
    expect(hasEmptyString).toBe(true)
  })

  it("should create a game with two players with diferent values and turn values", () => {
    expect(game.playerOne.value).not.toEqual(game.playerTwo.value)
    expect(game.playerOne.itsTurn).not.toBe(game.playerTwo.itsTurn)
  })

  it("should set value of an selected square by position", () => {
    game.setSquareValue(3)
    game.setSquareValue(5)
    game.setSquareValue(7)

    expect(game.squares.get(3).value).toEqual(game.playerOne.value)
    expect(game.squares.get(5).value).toEqual(game.playerTwo.value)
    expect(game.squares.get(7).value).toEqual(game.playerOne.value)
  })

  it("should not set value of an selected square by position if it is setted before", () => {
    game.setSquareValue(3)
    game.setSquareValue(3)
    
    expect(game.squares.get(3).value).toEqual(game.playerOne.value)
  })

  it("should change the players turn when set value", () => {
    game.setSquareValue(3)
    
    expect(game.playerOne.itsTurn).toBe(false)
    expect(game.playerTwo.itsTurn).toBe(true)

    game.setSquareValue(6)

    expect(game.playerOne.itsTurn).toBe(true)
    expect(game.playerTwo.itsTurn).toBe(false)
  })

  it("should check end game returns false if the game is not finished yet", () => {
    setupUnfinishedGame()

    expect(game.checkEndGame()).toBe(false)
  })

  it("should check end game returns true if horizontal lines have the same value", () => {
    setupFinishedGameWithHorizontalLines()

    expect(game.checkEndGame()).toBe(true)
  })

  it("should check end game returns true if vertical lines have the same value", () => {
    setupFinishedGameWithVerticalLines()

    expect(game.checkEndGame()).toBe(true)
  })

  it("should check end game returns true if principal diagonal line has the same value", () => {
    setupFinishedGameWithPrincipalDiagonalLine()

    expect(game.checkEndGame()).toBe(true)
  })

  it("should check end game returns true if secondary diagonal line has the same value", () => {
    setupFinishedGameWithSecondaryDiagonalLine()

    expect(game.checkEndGame()).toBe(true)
  })

  it("should don't turn player if end game returns true", () => {
    setupFinishedGameWithHorizontalLines()

    expect(game.playerOne.itsTurn).toBe(true)
  })

  it("should set game status finished if end game returns true", () => {
    setupFinishedGameWithHorizontalLines()

    expect(game.status).toEqual("finished")
  })

  it("should set game status in_progress when game init", () => {
    expect(game.status).toEqual("in_progress")
  })

  it("should not set values if status is finished", () => {
    game.status = "finished"
    game.setSquareValue(7)

    expect(game.squares.get(7).value).toEqual("")
  })

  it("should set winner equals true to current player if he's win", () => {
    setupFinishedGameWithHorizontalLines()

    expect(game.playerOne.winner).toBe(true)
  })

  it("should set player victory only if game status is finished", () => {
    game.setPlayerVictory()

    expect(game.playerOne.winner).toBe(false)
    expect(game.playerTwo.winner).toBe(false)
  })

  it("should not set player victory after theres a winner", () => {
    game.status = "finished"
    game.playerOne.winner = true
    game.playerOne.itsTurn = false
    game.playerTwo.itsTurn = true
    game.setPlayerVictory()

    expect(game.playerOne.winner).toBe(true)
    expect(game.playerTwo.winner).toBe(false)
  })

  it("should check end game returns true if all squares are filled", () => {
    setupDrawGame()

    expect(game.checkEndGame()).toBe(true)
  })

  it("should game status be draw if all squares are filled", () => {
    setupDrawGame()

    expect(game.status).toBe("draw")
  })

  it("should game status be finished if all squares are filled but with a winner", () => {
    setupFinishedGameWithAllSquaresFilled()

    expect(game.status).toBe("finished")
  })
})