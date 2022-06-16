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
  display = new Display(game, board, message, initButton)
}

initButton.addEventListener("click", init)

window.onload = () =>{
  init()
}

board.addEventListener("pointerdown", (e) => {
  if (e.target.className === "board") return
  const square = Number(e.target.dataset.square)
  display.render(square)
})