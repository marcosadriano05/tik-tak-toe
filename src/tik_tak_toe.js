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

export class TikTakToe {
  squares = []

  constructor() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.squares.push(new Square(i, j))
      }
    }
  }

  setValue(value, position) {
    if (this.squares[position.row, position.col].value === "") {
      this.squares[position.row, position.col].value = value
    }
  }
}