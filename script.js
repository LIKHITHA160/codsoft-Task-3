document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let firstOperand = '';
    let secondOperand = '';
    let operator = null;
    let isSecondOperand = false;

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const numValue = this.getAttribute('data-num');
            const operatorValue = this.getAttribute('data-operator');

            if (numValue !== null) {
                handleNumberInput(numValue);
            } else if (operatorValue !== null) {
                handleOperatorInput(operatorValue);
            } else if (this.id === 'clear') {
                clearDisplay();
            } else if (this.id === 'equals') {
                calculateResult();
            }
        });
    });

    function handleNumberInput(value) {
        if (!isSecondOperand) {
            firstOperand += value;
            display.textContent = firstOperand + (operator ? ` ${operator}` : '');
        } else {
            secondOperand += value;
            display.textContent = `${firstOperand} ${operator} ${secondOperand}`;
        }
    }

    function handleOperatorInput(value) {
        if (firstOperand !== '') {
            operator = value;
            isSecondOperand = true;
            display.textContent = `${firstOperand} ${operator}`;
        }
    }

    function calculateResult() {
        if (firstOperand !== '' && secondOperand !== '' && operator !== null) {
            const num1 = parseFloat(firstOperand);
            const num2 = parseFloat(secondOperand);
            let result;

            switch (operator) {
                case '+':
                    result = num1 + num2;
                    break;
                case '-':
                    result = num1 - num2;
                    break;
                case '*':
                    result = num1 * num2;
                    break;
                case '/':
                    result = num1 / num2;
                    break;
                default:
                    return;
            }

            display.textContent = `${firstOperand} ${operator} ${secondOperand} = ${result}`;
            resetCalculator(); // Reset after the calculation
        }
    }

    function clearDisplay() {
        display.textContent = '';
        resetCalculator();
    }

    function resetCalculator() {
        firstOperand = '';
        secondOperand = '';
        operator = null;
        isSecondOperand = false;
    }
});
