export class Display {
  constructor(squares) {
    this.squares = squares
  }

  winColor() {
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
}