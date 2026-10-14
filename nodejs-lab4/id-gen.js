const { nanoid } = require("nanoid");

for (let i = 1; i <= 5; i++) {
    console.log(`ID ${i}: ${nanoid()}`);
}
