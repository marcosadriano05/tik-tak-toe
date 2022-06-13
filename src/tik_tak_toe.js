export class Square {
  constructor() {
    this.value = ""
  }
}

export class Player {
  constructor(value, itsTurn) {
    this.value = value
    this.winner = false
    this.itsTurn = itsTurn
  }
}

export class TikTakToe {
  squares = new Map()

  constructor() {
    for (let i = 0; i < 9; i++) {
        this.squares.set(i + 1, new Square())
    }
    this.playerOne = new Player("X", true)
    this.playerTwo = new Player("O", false)
  }

  setSquareValue(squareNumber) {
    if (this.squares.get(squareNumber).value !== "") return
    
    const square = new Square()
    square.value = this.playerOne.itsTurn ? this.playerOne.value : this.playerTwo.value
    this.squares.set(squareNumber, square)

    this.changePlayerTurn()
  }

  checkEndGame() {
    let lines = []
    for (let i = 0; i < 3; i++) {
      const hasSameValues = this.squares.get(i * 3 + 1).value === this.squares.get(i * 3 + 2).value &&
      this.squares.get(i * 3 + 2).value === this.squares.get(i * 3 + 3).value
      lines.push(hasSameValues)
    }
    if (lines.some(line => line)) return true
    return false
  }

  changePlayerTurn() {
    this.playerOne.itsTurn = !this.playerOne.itsTurn
    this.playerTwo.itsTurn = !this.playerTwo.itsTurn
  }
}