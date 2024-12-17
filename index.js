// Select DOM elements
const text = document.querySelector('input');
const res = document.querySelector('.res');

// Event delegation for numbers and operators
document.body.addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList.contains('num')) {
        updateInput(target.textContent);
    } else if (target.classList.contains('opp')) {
        manageOperators(target.value);
    } else if (target.classList.contains('res')) {
        computeResult();
    }
});

// update input
const updateInput = (valore) => text.value += valore;

// Manage operators and reset
const manageOperators = (operator) => {
    if (operator === 'AC') text.value = '';
    else text.value += operator;
};

// compute and update the result
const computeResult = () => {
    const expression = text.value;
    const { numbers, operators } = splitNumAndOperators(expression);
    const risultato = compute(numbers, operators);
    text.value = isNaN(risultato) ? "Errore" : risultato;
};

// split number and operator
const splitNumAndOperators = (expression) => {
    const numbers = expression.split(/[\+\-\x÷%]/).map(parseFloat);
    const operators = expression.match(/[\+\-\x÷%]/g) || [];
    return { numbers, operators };
};

// compute result FROM number and operator
const compute = (numbers, operators) => {
    return operators.reduce((result, operator, i) => {
        const num = numbers[i + 1];
        switch (operator) {
            case '+': return result + num;
            case '-': return result - num;
            case 'x': return result * num;
            case '÷': return num !== 0 ? result / num : NaN;
            case '%': return result % num;
            default: return result;
        }
    }, numbers[0]);
};
