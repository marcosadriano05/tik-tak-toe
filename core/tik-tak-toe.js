/**
 * Fill all the fields with empty string and with the given length.
 * @param {number} fieldsQuantity 
 * @returns {string[]}
 */
export const initFieldsState = (fieldsQuantity) => {
  if (!Number.isInteger(Math.sqrt(fieldsQuantity))) {
    throw new Error("The number should be a square number")
  }
  let arr = []
  for (let i = 0; i < fieldsQuantity; i++) {
    arr = arr.concat("")
  }
  return arr
}

/**
 * Replace the value of an field position with a given value
 * @param {string[]} fields
 * @param {number} position 
 * @param {string} value 
 * @returns {string[]}
 */
export const insertValueOnPosition = (fields, position, value) => {
  if (position < 0 || position > fields.length - 1) {
    throw new Error("Position should be on the range of field array indexes")
  }
  if (fields[position] !== "") {
    throw new Error("Position already has a value")
  }
  return fields.map((f, i) => i === position ? value : f)
}

/**
 * Returns true if has winner or false if not.
 * @param {string[]} fields 
 * @returns {boolean}
 */
export const hasWinner = (fields) => {
  const square = Math.sqrt(fields.length)
  // Vertical check
  for (let col = 0; col < square; col++) {
    let columnValues = []
    for (let row = 0; row < square; row++) {
      columnValues = columnValues.concat(fields[row * square + col])
    }
    if (columnValues.every((v, _, arr) => v === arr[0] && v !== "")) {
      return true
    }
  }
  // Horizontal check
  for (let row = 0; row < square; row++) {
    let rowValues = []
    for (let col = 0; col < square; col++) {
      rowValues = rowValues.concat(fields[row * square + col])
    }
    if (rowValues.every((v, _, arr) => v === arr[0] && v !== "")) {
      return true
    }
  }

  // Main diagonal check
  let mainDiagonalValues = []
  for (let row = 0; row < square; row++) {
    mainDiagonalValues = mainDiagonalValues.concat(fields[row + square * row])
  }
  if (mainDiagonalValues.every((v, _, arr) => v === arr[0] && v !== "")) {
    return true
  }

  // Secondary diagonal check
  let secondaryDiagonalValues = []
  for (let row = 0; row < square; row++) {
    secondaryDiagonalValues = secondaryDiagonalValues.concat(fields[square - 1 * (row + 1) + square * row])
  }
  if (secondaryDiagonalValues.every((v, _, arr) => v === arr[0] && v !== "")) {
    return true
  }

  return false
}