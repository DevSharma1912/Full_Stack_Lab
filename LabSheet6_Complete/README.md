# Lab Sheet 6 — APIs

Complete Node.js + Express REST API, Plain JavaScript client, and React client.

## Project structure

- `Server/` — Express REST API
- `Client/` — Plain JavaScript client
- `client-react/` — Vite + React client

## Server setup

Open PowerShell in `LabSheet6\Server`:

```powershell
npm install
npm run dev
```

The API runs on:

`http://localhost:5000`

API key:

`novacart123`

## REST endpoints

- GET `/api/tasks`
- GET `/api/tasks/:id`
- POST `/api/tasks`
- PUT `/api/tasks/:id`
- DELETE `/api/tasks/:id`

GET requests do not require the API key.

POST, PUT and DELETE require:

`x-api-key: novacart123`

## Plain JavaScript client

Open `Client/index.html` in a browser while the server is running.

For a clean local browser setup, you can also serve the Client folder with VS Code Live Server.

## React client

Open another PowerShell in `LabSheet6\client-react`:

```powershell
npm install
npm run dev
```

Open the Vite URL shown in the terminal.

## Postman / Thunder Client

Create a collection named `API Lab`.

Test all five endpoints. Add `x-api-key: novacart123` to POST, PUT and DELETE.

A POST without the key should return HTTP 401.

## CORS failure test

For the Lab Sheet requirement, temporarily comment out:

```js
app.use(cors());
```

Restart the server and call the API from the browser client. The browser should report a CORS-related blocked request. Re-enable the line and restart the server to confirm the request works again.

## Important

`.env` contains the local API key and is excluded by `.gitignore`.
