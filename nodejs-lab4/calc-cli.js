const [, , first, second, operator] = process.argv;

const a = Number(first);
const b = Number(second);
let result;

if (Number.isNaN(a) || Number.isNaN(b)) {
    console.log("Please enter two valid numbers.");
    process.exit(1);
}

switch (operator) {
    case "+":
        result = a + b;
        break;
    case "-":
        result = a - b;
        break;
    case "*":
        result = a * b;
        break;
    case "/":
        if (b === 0) {
            console.log("Cannot divide by zero.");
            process.exit(1);
        }
        result = a / b;
        break;
    default:
        console.log("Use +, -, *, or / as the operator.");
        process.exit(1);
}

console.log(`Result: ${result}`);