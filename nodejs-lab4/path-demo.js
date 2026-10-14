const path = require("path");

const filePath = "/home/user/data/report.pdf";
const relativePath = "./data/report.pdf";

console.log("Directory:", path.dirname(filePath));
console.log("Base name:", path.basename(filePath));
console.log("Extension:", path.extname(filePath));
console.log("Absolute path:", path.resolve(relativePath));
