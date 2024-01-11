import assert, { AssertionError } from "node:assert"

/**
 * Function that will be tested.
 * @callback executionFunction
 */
/**
 * 
 * @param {executionFunction} cb 
 * @param {Object} errorProps 
 * @param {string} errorProps.message
 */
export function shouldThrow(cb, errorProps) {
  try {
    cb()
    assert.fail("Expected an exception")
  } catch (error) {
    if (error instanceof AssertionError) {
      throw error
    }
    assert.strictEqual(error.message, errorProps.message)
  }
}