const fs = require("fs");

const folder = "uploads";
const files = ["file1.txt", "file2.txt", "file3.txt"];

function createFiles() {
    let remaining = files.length;

    files.forEach((file) => {
        fs.writeFile(`${folder}/${file}`, "", (err) => {
            if (err) throw err;
            remaining--;

            if (remaining === 0) {
                fs.readdir(folder, (err, entries) => {
                    if (err) throw err;
                    console.log("Files:", entries.join(", "));

                    fs.unlink(`${folder}/${files[0]}`, (err) => {
                        if (err) throw err;
                        console.log(`Deleted: ${files[0]}`);
                    });
                });
            }
        });
    });
}

fs.mkdir(folder, { recursive: true }, (err) => {
    if (err) throw err;
    createFiles();
});
