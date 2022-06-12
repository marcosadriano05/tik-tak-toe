export class Position {
  constructor(row, col) {
    this.row = row
    this.col = col
  }
}

export class Square {
  constructor(row, col) {
    this.position = new Position(row, col)
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
    let key = 0
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.squares.set(++key, new Square(i, j))
      }
    }
    this.playerOne = new Player("X", true)
    this.playerTwo = new Player("O", false)
  }

  setSquareValue(position) {
    const key = this.checkSquareKeyByPosition(position)
    if (this.squares.get(key).value !== "") return
    
    const square = new Square(position.row, position.col)
    square.value = this.playerOne.itsTurn ? this.playerOne.value : this.playerTwo.value
    this.squares.set(key, square)

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
  }

  changePlayerTurn() {
    this.playerOne.itsTurn = !this.playerOne.itsTurn
    this.playerTwo.itsTurn = !this.playerTwo.itsTurn
  }

  checkSquareKeyByPosition(position) {
    return position.row * 3 + position.col + 1
  }
}