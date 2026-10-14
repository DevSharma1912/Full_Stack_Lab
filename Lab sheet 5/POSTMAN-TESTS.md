# Postman / Thunder Client Test Data

## GET /
`http://localhost:4000/`

## GET /about
`http://localhost:4000/about`

## GET /courses
`http://localhost:4000/courses`

## POST /echo
URL: `http://localhost:4000/echo`
Body -> raw -> JSON:
```json
{"message":"Hello Express","number":5}
```

## GET /api/students/1
`http://localhost:4000/api/students/1`

## GET /search
`http://localhost:4000/search?name=Dev&age=20`

## GET /products/:category/:id
`http://localhost:4000/products/electronics/101`

## GET /admin/dashboard
Without header: should return 403.

With header:
`x-api-key: novacart123`

## POST /register
```json
{
  "name": "Dev Sharma",
  "email": "dev@example.com",
  "password": "12345"
}
```

## POST /contact
Choose `x-www-form-urlencoded`:
- name = Dev Sharma
- message = Hello

## Books
GET `http://localhost:4000/api/books`

GET `http://localhost:4000/api/books/1`

POST `http://localhost:4000/api/books`
```json
{
  "title": "Node.js Guide",
  "author": "Dev Sharma"
}
```

## Tasks CRUD
GET `http://localhost:4000/api/tasks`

GET `http://localhost:4000/api/tasks/1`

POST `http://localhost:4000/api/tasks`
```json
{
  "title": "Learn Express",
  "completed": false
}
```

PUT `http://localhost:4000/api/tasks/1`
```json
{
  "completed": true
}
```

DELETE `http://localhost:4000/api/tasks/1`

## Error test
GET `http://localhost:4000/api/tasks/999`
