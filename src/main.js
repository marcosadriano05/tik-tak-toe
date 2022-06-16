import "../styles/main.css"
import { TikTakToe } from "./tik_tak_toe.js"
import { Display } from "./display"

const board = document.querySelector(".board")
const initButton = document.querySelector("[data-init]")
const message = document.querySelector("[data-message]")
let game
let display

function init() {
  game = new TikTakToe()
  board.innerHTML = ""
  let squares = []
  for (let i = 0; i < 9; i++) {
    const square = document.createElement("button")
    square.dataset.square = i + 1
    square.classList.add("square")
    board.appendChild(square)
    squares.push(square)
  }
  display = new Display(squares)
  message.innerHTML = "Player: X"
  initButton.innerHTML = "Reboot"
}

initButton.addEventListener("click", init)

window.onload = () =>{
  init()
}

board.addEventListener("pointerdown", (e) => {
  if (e.target.className === "board") return
  const square = Number(e.target.dataset.square)
  render(square)
})

function render(squareNumber) {
  if (game.status !== "finished") {
    game.setSquareValue(squareNumber)
    displayInfo()
    const square = Array.from(board.children).find(button => button.dataset.square === `${squareNumber}`)
    square.innerHTML = game.squares.get(squareNumber).value
    square.classList.add("filled")
    display.winColor()
  }
}

function displayInfo() {
  if (game.status === "finished") {
    message.innerHTML = game.playerOne.winner ? "Player X win" : "Player O win"
    initButton.innerHTML = "Play again"
  } else if (game.status === "draw") {
    message.innerHTML = "Draw"
    initButton.innerHTML = "Play again"
  } else {
    message.innerHTML = game.playerOne.itsTurn ? "Player: X" : "Player: O"
  }
}