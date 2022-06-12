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

  setValue(value, position) {
    const key = this.checkSquareKeyByPosition(position)
    if (this.squares.get(key).value !== "") return
      
    this.squares.get(key).value = value

    this.playerOne.itsTurn = !this.playerOne.itsTurn
    this.playerTwo.itsTurn = !this.playerTwo.itsTurn
  }

  checkSquareKeyByPosition(position) {
    if (position.row === 0) {
      return position.col + 1
    }
    if (position.row === 1) {
      return position.col + 1 + 3
    }
    if (position.row === 2) {
      return position.col + 1 + 6
    }
  }
}