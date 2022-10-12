import {sumPositiveNumbers} from './example'
describe("When the arguments passed are positive numbers", () => {
  test("Should return the right answer",() => {
    expect(sumPositiveNumbers(4,5)).toBe(9);
  })
})

describe("When one of the numbers is a negative number",() => {
  test("should throw an error",() => {
    let error;
    try {
      sumPositiveNumbers(4,-5)
    } catch (err) {
      error = err

    }
    
    // expect(error.message).toBe("hello")
    expect(error).toBeDefined();
    // expect(error.message).toBe("one of the numbers is negative")

  })
})