// Pegar os botões de marcação na DOM
const buttons = document.querySelectorAll('[data-square]')

// Estado inicial do jogo
let isXPlayer = true
let gameState = new Array(9).fill('')

// Adicionar evento de click nos botões de marcação
buttons.forEach(button => {
  button.addEventListener('click', e => {
    play(button)
    console.log('oi')
  })
})

// Execução do jogo
function play(button) {
  setButtonValue(button)
  disableClickedButton(button)
  refreshGameState(button)
}

// Ao clicar num botão, seu valor deve ser atualizado
function setButtonValue(button) {
  button.textContent = currentPlayer()
  isXPlayer = !isXPlayer
}

// Verificar se o jogador é X ou O
function currentPlayer() {
  return isXPlayer ? 'X' : 'O'
}

// Atualizar estado do game
function refreshGameState(button) {
  let currentButton = button.dataset.square
  
  if (gameState[currentButton - 1] === '') {
    gameState[currentButton - 1] = button.textContent
  }
}

// Verificar se botão já foi acionado e desabilitá-lo
function disableClickedButton(button) {
  if (button.textContent !== '') {
    button.setAttribute('disabled', true)
    button.style.cursor = 'default'
  }
}

// Verificar se há ganhador ou empate
function checkResult() {
  let result = [false, []]
  
  if (gameState[1] === gameState[2] && gameState[2] === gameState[3]) result = [true, [0, 1, 2]]
  if (gameState[4] === gameState[5] && gameState[5] === gameState[6]) result = [true, [3, 4, 5]]
  if (gameState[7] === gameState[8] && gameState[8] === gameState[9]) result = [true, [6, 7, 8]]

  if (gameState[1] === gameState[4] && gameState[4] === gameState[7]) result = [true, [0, 5, 6]]
  if (gameState[2] === gameState[5] && gameState[5] === gameState[8]) result = [true, [1, 4, 9]]
  if (gameState[3] === gameState[6] && gameState[6] === gameState[9]) result = [true, [2, 5, 8]]

  if (gameState[1] === gameState[5] && gameState[5] === gameState[9]) result = [true, [0, 4, 8]]
  if (gameState[3] === gameState[5] && gameState[5] === gameState[7]) result = [true, [2, 4, 6]]

  return result
}
