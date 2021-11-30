// Magic Calculator

let displayValue;
let numberA;
let selectedOperation;
let numberB;
let equationSolved;

const calculatorScreen = document.querySelector('#calculatorScreen');
const displayText = document.querySelector('#displayText');
const numberKeys = document.querySelectorAll('[data-number]');
const operatorKeys = document.querySelectorAll('[data-operator]');
const clearKey = document.querySelector('#key-clear');
const decimalKey = document.querySelector('#key-decimal');
const enterKey = document.querySelector('#key-enter');
const equalsKey = document.querySelector('#key-equals');

numberKeys.forEach((button) =>
    button.addEventListener('click', () =>
        handleNumberInput(button.textContent)
    )
);

operatorKeys.forEach((button) =>
    button.addEventListener('click', () =>
        handleOperatorInput(button.textContent)
    )
);

clearKey.addEventListener('click', clearValues);
decimalKey.addEventListener('click', handleDecimalInput);
enterKey.addEventListener('click', handleEqualsInput);
equalsKey.addEventListener('click', handleEqualsInput);

window.addEventListener('keydown', convertKeyPressToInput);

window.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
    }
});

function convertKeyPressToInput(e) {
    if (isFinite(e.key)) handleNumberInput(e.key);
    if (e.key === '+') handleOperatorInput(e.key);
    if (e.key === '-') handleOperatorInput(e.key);
    if (e.key === '*') handleOperatorInput(e.key);
    if (e.key === '/') handleOperatorInput(e.key);
    if (e.key === 'Clear') clearValues();
    if (e.key === '.') handleDecimalInput();
    if (e.key === 'Enter') handleEqualsInput();
    if (e.key === '=') handleEqualsInput();
}

clearValues();

function clearValues() {
    displayValue = '0';
    numberA = null;
    selectedOperation = null;
    numberB = null;
    equationSolved = false;
    updateDisplayValue(displayValue);
}

function updateDisplayValue(value) {
    displayValue = value;

    calculatorScreen.textContent = displayValue;
}

function handleNumberInput(number) {
    if (equationSolved) { return };
    if (numberA === null && selectedOperation === null && numberB === null) {
        setNumberA(number);
        return;
    }
    if (numberA !== null && selectedOperation === null && numberB === null) {
        appendNumberA(number);
        return;
    }
    if (numberA !== null && selectedOperation !== null && numberB === null) {
        setNumberB(number);
        return;
    }
    if (numberA !== null && selectedOperation !== null && numberB !== null) {
        appendNumberB(number);
        return;
    }
}

function setNumberA(number) {
    numberA = number;
    updateDisplayValue(numberA);
}

function appendNumberA(number) {
    if (number === '.' && numberA.includes('.')) {
        return;
    }
    if (numberA == '0') {
        setNumberA(number);
        return;
    }
    if (numberA.length > 8) return;

    numberA += number;
    updateDisplayValue(numberA);
}

function setNumberB(number) {
    numberB = number;
    updateDisplayValue(numberB);
}

function appendNumberB(number) {
    if (number === '.' && numberB.includes('.')) {
        return;
    }
    if (numberB == '0') {
        setNumberB(number);
        return;
    }

    if (numberB.length > 8) return;

    numberB += number;
    updateDisplayValue(numberB);
}

function handleOperatorInput(operator) {
    if (equationSolved) { equationSolved = false }
    if (numberA === null && selectedOperation === null && numberB === null) {
        return;
    }
    if (numberA !== null && selectedOperation === null && numberB === null) {
        setOperator(operator);
        return;
    }
    if (numberA !== null && selectedOperation !== null && numberB === null) {
        setOperator(operator);
        return;
    }
    if (numberA !== null && selectedOperation !== null && numberB !== null) {
        solveEquation();
        setOperator(operator);
        return;
    }
}

function setOperator(operator) {
    updateDisplayValue(operator);
    selectedOperation = `${operator}`;
}

function handleDecimalInput(number) {
    let decimalPoint = '.';
    handleNumberInput(decimalPoint);
}

function handleEqualsInput() {
    equationSolved = true;
    solveEquation();
}

function solveEquation() {
    preventDivideByZero();
    let result = operate(numberA, numberB, selectedOperation);
    let roundedResult = roundResult(result);
    updateDisplayValue(String(roundedResult));
    chainEquation(roundedResult);
}

function chainEquation(roundedResult) {
    numberA = roundedResult;
    selectedOperation = null;
    numberB = null;
}

function operate(numberA, numberB, selectedOperation) {
    let a = Number(numberA);
    let b = Number(numberB);

    switch (selectedOperation) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return null;
    }
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
}

function preventDivideByZero() {
    if (selectedOperation === '/' && numberB === '0') {
        clearValues();
        alert('Division by Zero not Allowed');
        return;
    }
}
