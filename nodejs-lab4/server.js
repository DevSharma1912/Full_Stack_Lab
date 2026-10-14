const http = require("http");
const url = require("url");

const students = [
    { id: 1, name: "Dev Sharma", course: "CSE" },
    { id: 2, name: "Aman Kumar", course: "CSE" },
    { id: 3, name: "Priya Singh", course: "CSE" }
];

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    res.setHeader("Content-Type", "application/json");

    if (req.method !== "GET") {
        res.statusCode = 405;
        res.end(JSON.stringify({ error: "Method Not Allowed" }));
        return;
    }

    if (pathname === "/") {
        res.setHeader("Content-Type", "text/plain");
        res.end("Welcome to the NovaCart Node.js Server");
        return;
    }

    if (pathname === "/students") {
        res.end(JSON.stringify(students));
        return;
    }

    const studentMatch = pathname.match(/^\/students\/([^/]+)$/);
    if (studentMatch) {
        const id = Number(studentMatch[1]);
        const student = students.find((item) => item.id === id);

        if (!student) {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: "Student not found" }));
            return;
        }

        res.end(JSON.stringify(student));
        return;
    }

    if (pathname === "/search") {
        const keyword = parsedUrl.query.keyword || "";
        res.setHeader("Content-Type", "text/plain");
        res.end(`Search keyword: ${keyword}`);
        return;
    }

    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>404 - Page Not Found</h1>");
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
