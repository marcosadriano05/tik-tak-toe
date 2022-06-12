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
    const firstLine = this.squares.get(1).value === this.squares.get(2).value &&
      this.squares.get(2).value === this.squares.get(3).value
    const secondLine = this.squares.get(4).value === this.squares.get(5).value &&
      this.squares.get(5).value === this.squares.get(6).value
    const thirdLine = this.squares.get(7).value === this.squares.get(8).value &&
      this.squares.get(8).value === this.squares.get(9).value
    
    if (firstLine || secondLine || thirdLine) return true
  }

  changePlayerTurn() {
    this.playerOne.itsTurn = !this.playerOne.itsTurn
    this.playerTwo.itsTurn = !this.playerTwo.itsTurn
  }

  checkSquareKeyByPosition(position) {
    return position.row * 3 + position.col + 1
  }
}