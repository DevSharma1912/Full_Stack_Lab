# Express.js Lab Sheet 5

Name: Dev Sharma  
Roll No: CU24250269

## Setup

```bash
npm install
npm run dev
```

Server:
`http://localhost:4000`

## Main tests

### Part A-B
- GET `/`
- GET `/about`
- GET `/courses`
- POST `/echo`

### Part C
- GET `/api/students/1`
- GET `/search?name=Dev&age=20`
- GET `/products/electronics/101`

### Part D
- GET `/admin/dashboard` without `x-api-key` -> 403
- GET `/admin/dashboard` with `x-api-key: novacart123` -> success

### Part E
- POST `/register`
- POST `/contact`

### Part F
- GET `/api/students/1`
- GET `/api/books`
- GET `/api/books/1`
- POST `/api/books`

### Part G
Resource used: tasks
- GET `/api/tasks`
- GET `/api/tasks/1`
- POST `/api/tasks`
- PUT `/api/tasks/1`
- DELETE `/api/tasks/1`

### Part H
- Unknown URL -> `{ "error": "Route not found" }`
- GET `/api/tasks/999` -> centralized 404 error

### Part I
- `public/index.html` is served by Express static middleware.
- `.env` contains `PORT=4000`.
