// Pegar os botões de marcação na DOM e de reiniciar o jogo
const buttons = document.querySelectorAll('[data-square]')
const reloadButton = document.querySelector('[data-reload]')

// Pegar tag da mensagem na DOM
const message = document.querySelector('[data-message]')

// Estado inicial do jogo
let isXPlayer = true
let gameState = new Array(9).fill('')
gameState = gameState.map((_, index) => index + 1)
let squaresFilled = 0

// Iniciar game
function init() {
  // Adicionar evento de click nos botões de marcação
  buttons.forEach(button => {
    button.addEventListener('click', e => {
      play(button)
    })
  })  
  
  // Adicionar evento de click no botão de reiniciar partida
  reloadButton.addEventListener('click', e => reloadStates())
}

// Execução do jogo
function play(button) {
  setButtonValue(button)
  disableButton(button)
  refreshGameState(button)
  console.log(checkResult())
  endGame()
}

// Ao clicar num botão, seu valor deve ser atualizado
function setButtonValue(button) {
  const player = currentPlayer();
  message.textContent = `Vez do jogador ${player}`
  button.textContent = player
  isXPlayer = !isXPlayer
}

// Verificar se o jogador é X ou O
function currentPlayer() {
  return isXPlayer ? 'X' : 'O'
}

// Atualizar estado do game
function refreshGameState(button) {
  let currentButton = button.dataset.square
  
  if (gameState[currentButton - 1] !== 'X'|| gameState[currentButton - 1] !== 'O') {
    gameState[currentButton - 1] = button.textContent
    squaresFilled++
  }
}

// Desabilitar botão
function disableButton(button) {
  button.setAttribute('disabled', true)
  button.style.cursor = 'default'
}

// Habilitar botão
function ableButton(button) {
  button.setAttribute('disabled', false)
  button.style.cursor = 'pointer'
}

// Finalizar o jogo
function endGame() {
  const [isEndGame, result] = checkResult()

  if (isEndGame) {
    message.textContent = result.length > 0 
      ? `${currentPlayer() === 'X' ? 'O' : 'X'} é o vencedor!` 
      : `Jogo empatado.`

    buttons.forEach((button, index) => {
      disableButton(button)

      button.style.color = 'black'
      button.style.border = '1px solid black'

      if (result.indexOf(index) < 0) {
        button.style.background = '#ff2929'
      } else {
        button.style.background = '#61ff71'
      }

      reloadButton.style.display = 'block'
    })
  }
}

// Reiniciar os estados
function reloadStates() {
  window.location.reload()
}

// Verificar se há ganhador ou empate
function checkResult() {  
  if (gameState[0] === gameState[1] && gameState[1] === gameState[2]) return [true, [0, 1, 2]]
  if (gameState[3] === gameState[4] && gameState[4] === gameState[5]) return [true, [3, 4, 5]]
  if (gameState[6] === gameState[7] && gameState[7] === gameState[8]) return [true, [6, 7, 8]]

  if (gameState[0] === gameState[3] && gameState[3] === gameState[6]) return [true, [0, 3, 6]]
  if (gameState[1] === gameState[4] && gameState[4] === gameState[7]) return [true, [1, 4, 7]]
  if (gameState[2] === gameState[5] && gameState[5] === gameState[8]) return [true, [2, 5, 8]]

  if (gameState[0] === gameState[4] && gameState[4] === gameState[8]) return [true, [0, 4, 8]]
  if (gameState[2] === gameState[4] && gameState[4] === gameState[6]) return [true, [2, 4, 6]]

  if (squaresFilled === 9) return [true, []]

  return [false, []]
}

init()