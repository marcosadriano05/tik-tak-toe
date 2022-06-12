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
  squares = []

  constructor() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.squares.push(new Square(i, j))
      }
    }
    this.playerOne = new Player("X", true)
    this.playerTwo = new Player("O", false)
  }

  setValue(value, position) {
    if (this.squares[position.row, position.col].value === "") {
      this.squares[position.row, position.col].value = value
    }
  }
}