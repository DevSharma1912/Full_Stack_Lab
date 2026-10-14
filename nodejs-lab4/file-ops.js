const fs = require("fs");

const fileName = "student.txt";
const newFileName = "profile.txt";

fs.writeFile(fileName, "Name: Dev Sharma\nRoll Number: CU24250269\n", (err) => {
    if (err) throw err;

    fs.appendFile(fileName, "Course: Full Stack Web Development\n", (err) => {
        if (err) throw err;

        fs.readFile(fileName, "utf8", (err, data) => {
            if (err) throw err;
            console.log(data.trim());

            fs.rename(fileName, newFileName, (err) => {
                if (err) throw err;
                console.log(`Renamed ${fileName} to ${newFileName}`);
            });
        });
    });
});
