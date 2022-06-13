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
    this.status = "in_progress"
  }

  setSquareValue(squareNumber) {
    if (this.status === "finished") return
    if (this.squares.get(squareNumber).value !== "") return
    
    const square = new Square()
    square.value = this.playerOne.itsTurn ? this.playerOne.value : this.playerTwo.value
    this.squares.set(squareNumber, square)

    this.checkEndGame()
    this.changePlayerTurn()
  }

  checkEndGame() {
    let lines = []
    for (let i = 0; i < 3; i++) {
      const hasSameValues = this.squares.get(i * 3 + 1).value === this.squares.get(i * 3 + 2).value
      && this.squares.get(i * 3 + 2).value === this.squares.get(i * 3 + 3).value
      && this.squares.get(i * 3 + 1).value !== ""
      lines.push(hasSameValues)
    }
    if (lines.some(line => line)) {
      this.status = "finished"
      this.setPlayerVictory()
      return true
    }

    lines = []
    for (let i = 0; i < 3; i++) {
      const hasSameValues = this.squares.get(i + 1).value === this.squares.get(i + 4).value
        && this.squares.get(i + 4).value === this.squares.get(i + 7).value
        && this.squares.get(i + 1).value !== ""
      lines.push(hasSameValues)
    }
    if (lines.some(line => line)) {
      this.status = "finished"
      this.setPlayerVictory()
      return true
    }

    if (this.squares.get(1).value === this.squares.get(5).value
      && this.squares.get(5).value === this.squares.get(9).value
      && this.squares.get(1).value !== "") {
        this.status = "finished"
        this.setPlayerVictory()
        return true
    }
    
    if (this.squares.get(3).value === this.squares.get(5).value
      && this.squares.get(5).value === this.squares.get(7).value
      && this.squares.get(3).value !== "") {
        this.status = "finished"
        this.setPlayerVictory()
        return true
    }

    const squaresFilled = Array.from(this.squares.values()).every(square => square.value !== "")
    if (squaresFilled) {
      this.status = "draw"
      return true
    }

    return false
  }

  changePlayerTurn() {
    if (this.status === "finished") return
    this.playerOne.itsTurn = !this.playerOne.itsTurn
    this.playerTwo.itsTurn = !this.playerTwo.itsTurn
  }

  setPlayerVictory() {
    if (this.status !== "finished") return
    if (this.playerOne.winner || this.playerTwo.winner) return
    this.playerOne.itsTurn ? this.playerOne.winner = true : this.playerTwo.winner = true
  }
}