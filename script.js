const scrInput = document.querySelector(".input")
const scrOutput = document.querySelector(".output")
const clearBtn = document.querySelector(".clear")
const percentageBtn = document.querySelector(".percentage")
const operatorsBtn = document.querySelectorAll(".operator")
const numbersBtn = document.querySelectorAll(".number")
const decimalBtn = document.querySelector(".decimal")
const equalBtn = document.querySelector(".equal")

let prevNumber = ""
let calcOperator = ""
let currentNumber = "0"

const updateInputScreen = (char) => {
  scrInput.value += char
}

const handleNumber = (number) => {
  currentNumber == 0 && !currentNumber.includes(".")
    ? (currentNumber = number)
    : (currentNumber += number)

  prevNumber == "" && calcOperator == ""
    ? (scrInput.value = currentNumber)
    : updateInputScreen(number)
}

const clearAll = () => {
  scrInput.value = "0"
  scrOutput.value = ""
  prevNumber = ""
  calcOperator = ""
  currentNumber = "0"
}

clearBtn.addEventListener("click", () => {
  clearAll()
})

percentageBtn.addEventListener("click", (event) => {
  // prevent multiple percent signs as well as percent sign right after dot
  if (
    !currentNumber.includes("%") &&
    scrInput.value.charAt(scrInput.value.length - 1) !== "."
  ) {
    updateInputScreen(event.target.value)
    currentNumber = currentNumber / 100
  }
})

operatorsBtn.forEach((operator) => {
  operator.addEventListener("click", (event) => {
    // prevent multiple operator signs
    if (!calcOperator) {
      prevNumber = currentNumber
      updateInputScreen(event.target.value)
    }

    calcOperator = event.target.value
    currentNumber = "0"
  })
})

numbersBtn.forEach((number) => {
  number.addEventListener("click", (event) => {
    handleNumber(event.target.value)

    // auto clear all if a number is pressed right after the previous calculation
    if (scrOutput.value) {
      clearAll()
      handleNumber(event.target.value)
    }
  })
})

decimalBtn.addEventListener("click", (event) => {
  // prevent multiple dots in a number
  if (!currentNumber.includes(".")) {
    updateInputScreen(event.target.value)
    currentNumber += event.target.value
  }
})

equalBtn.addEventListener("click", () => {
  if (calcOperator) {
    let result = ""

    switch (calcOperator) {
      case "+":
        result = parseFloat(prevNumber) + parseFloat(currentNumber)
        break

      case "-":
        result = parseFloat(prevNumber) - parseFloat(currentNumber)
        break

      case "*":
        result = parseFloat(prevNumber) * parseFloat(currentNumber)
        break

      case "/":
        result = parseFloat(prevNumber) / parseFloat(currentNumber)
        break

      default:
        break
    }

    currentNumber = result
    calcOperator = ""
  }

  // use scientific notation if the answer is long
  scrOutput.value =
    currentNumber.toString().length > 10
      ? parseFloat(currentNumber).toExponential(3)
      : parseFloat(currentNumber)
})
