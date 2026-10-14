const fs = require("fs");

const fileName = "large-file.txt";
let content = "";

for (let i = 1; i <= 50; i++) {
    content += `This is line ${i} of the file.\n`;
}

fs.writeFile(fileName, content, (err) => {
    if (err) throw err;

    const stream = fs.createReadStream(fileName);

    stream.on("data", (chunk) => {
        console.log(`Chunk received: ${chunk.length} bytes`);
    });

    stream.on("end", () => {
        console.log("Finished reading file.");
    });
});
