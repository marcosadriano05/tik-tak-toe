export class Display {
  constructor(game, board, message, initButton) {
    this.game = game
    this.message = message
    this.initButton = initButton
    this.board = board

    this.board.innerHTML = ""
    this.squares = []

    for (let i = 0; i < 9; i++) {
      const square = document.createElement("button")
      square.dataset.square = i + 1
      square.classList.add("square")
      this.board.appendChild(square)
      this.squares.push(square)
    }

    this.message.innerHTML = "Player: X"
    this.initButton.innerHTML = "Reboot"
  }

  onWin() {
    for (let i = 0; i < 3; i++) {
      if (this.squares[i * 3].innerHTML === this.squares[i * 3 + 1].innerHTML 
        && this.squares[i * 3 + 1].innerHTML === this.squares[i * 3 + 2].innerHTML 
        && this.squares[i * 3].innerHTML !== "") {
          this.squares[i * 3].classList.add("win") 
          this.squares[i * 3 + 1].classList.add("win")
          this.squares[i * 3 + 2].classList.add("win")
          this.squares.forEach(square => {
            if (!square.classList.contains("win")) {
              square.classList.add("lose")
            }
          })
      }

      if (this.squares[i].innerHTML === this.squares[i + 3].innerHTML 
        && this.squares[i + 3].innerHTML === this.squares[i + 6].innerHTML 
        && this.squares[i].innerHTML !== "") {
          this.squares[i].classList.add("win") 
          this.squares[i + 3].classList.add("win")
          this.squares[i + 6].classList.add("win")
          this.squares.forEach(square => {
            if (!square.classList.contains("win")) {
              square.classList.add("lose")
            }
          })
      }
    }

    if (this.squares[0].innerHTML === this.squares[4].innerHTML 
      && this.squares[4].innerHTML === this.squares[8].innerHTML 
      && this.squares[0].innerHTML !== "") {
        this.squares[0].classList.add("win") 
        this.squares[4].classList.add("win")
        this.squares[8].classList.add("win")
    }

    if (this.squares[2].innerHTML === this.squares[4].innerHTML 
      && this.squares[4].innerHTML === this.squares[6].innerHTML 
      && this.squares[2].innerHTML !== "") {
        this.squares[2].classList.add("win") 
        this.squares[4].classList.add("win")
        this.squares[6].classList.add("win")
    }
  }

  render(squareNumber) {
    if (this.game.status !== "finished") {
      this.game.setSquareValue(squareNumber)
      const square = Array.from(this.board.children).find(button => button.dataset.square === `${squareNumber}`)
      square.innerHTML = this.game.squares.get(squareNumber).value
      square.classList.add("filled")
      this.message.innerHTML = this.game.playerOne.itsTurn ? "Player: X" : "Player: O"
      this.onWin()
    }

    if (this.game.status === "finished") {
      this.message.innerHTML = this.game.playerOne.winner ? "Player X win" : "Player O win"
      this.initButton.innerHTML = "Play again"
    } 
    
    if (this.game.status === "draw") {
      this.message.innerHTML = "Draw"
      this.initButton.innerHTML = "Play again"
    }
  }
}