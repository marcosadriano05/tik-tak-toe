class Position {
  constructor(row, col) {
    this.row = row
    this.col = col
  }
}

class Square {
  constructor(row, col) {
    this.position = new Position(row, col)
    this.value = ""
  }
}

class TikTakToe {
  squares = []

  constructor() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.squares.push(new Square(i, j))
      }
    }
  }
}

describe("Square", () => {
  it("should pass the position on creation and value is a empty string", () => {
    const square = new Square(1, 2)

    expect(square.position.row).toBe(1)
    expect(square.position.col).toBe(2)
    expect(square.value).toEqual("")
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
})