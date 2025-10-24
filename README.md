# 📚 In-Memory CRUD API (Books)

A small RESTful API built with **Node.js** and **Express** that stores data in an in-memory array. This repository implements **GET (Read)** functionality using a middleware-based handler. POST, PUT, and DELETE are left as next steps.

---

## ✅ What this project does (right now)

* Exposes an Express server with a GET endpoint that returns one or more books.
* Uses query parameters (`?id=1` or `?id=1&id=2`) to select items from an in-memory array (`DATABASE/books.js`).
* Handles missing, non-numeric, and not-found IDs by throwing errors or returning a helpful message.
* Errors are routed to Express error-handling middleware.

---

## 📁 Project structure

```
├── DATABASE/
│   └── books.js        # array-of-books sample data (export default [...])
├── logic.js            # middleware / REST logic (GET implemented)
├── server.js           # Express server setup and route wiring
├── .env                # Optional: PORT=8000
└── README.md           # This file
```

---

## 📦 Sample data (`DATABASE/books.js`)

```js
export default [
  {
    id: 1,
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt, David Thomas",
    year: 1999
  },
  {
    id: 2,
    title: "Clean Code",
    author: "Robert C. Martin",
    year: 2008
  },
  {
    id: 3,
    title: "Atomic Habits",
    author: "James Clear",
    year: 2018
  }
];
```

> The code expects the `books` array to be 0-indexed while `id` values are 1-based. The current `getHandler` subtracts 1 from the provided id when indexing into the array.

---

## 🚀 Quick start

1. Install dependencies

```bash
npm install
```

2. (Optional) Create a `.env` file to override the port

```
PORT=8000
```

3. Start the server

```bash
npm run dev
```

By default the server listens on `http://localhost:8000` (or the value of `PORT` in `.env`).

---

## 📡 API (implemented)

### GET `/` — Read book(s)

* Single id: `GET /?id=1` — returns the book with id `1`.
* Multiple ids: `GET /?id=1&id=2` — returns an array of results in the order requested.
* Missing id: calling `/` without `id` will cause `getHandler` to throw an error: `Query Id was not specified`.
* Non-numeric id: `getHandler` throws an error when a non-number id is encountered.
* Not-found id: for an id that does not map to data, the handler pushes a string message like `data not found for Id:5` into the result array.

#### Example: single ID

Request:

```
GET http://localhost:8000/?id=2
```

Example response:

```json
{
  "id": 2,
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "year": 2008
}
```

#### Example: multiple IDs

Request:

```
GET http://localhost:8000/?id=1&id=3
```

Example response:

```json
[
  { "id": 1, "title": "The Pragmatic Programmer", "author": "Andrew Hunt, David Thomas", "year": 1999 },
  { "id": 3, "title": "Atomic Habits", "author": "James Clear", "year": 2018 }
]
```

---

## ⚠ Error handling

Errors thrown in `logic.js` are forwarded to Express’s error middleware, which currently logs the error and returns a 500 response:

```js
app.use((err, req, res, next) => {
  console.error("Caught by Express:", err);
  res.status(500).send("Something broke");
});
```

If you prefer more descriptive client responses, replace the generic handler with logic that inspects `err` and returns appropriate status codes and JSON payloads.

---

## 🛠 Roadmap (what to implement next)

* **POST /** — create a new book (validate payload, auto-generate `id`).
* **PUT /books/:id** or **PATCH /books/:id** — update an existing book.
* **DELETE /books/:id** — remove a book from the in-memory array.
* Switch to `req.params` for resource-style routes (`/books/:id`) for clarity.
* Add input validation (e.g., using `joi` or `express-validator`).
* Persist data to a JSON file or a database (MongoDB / SQLite) to survive restarts.
* Split routes/controllers and add tests.

---

## 💡 Implementation notes & tips

* The current `getHandler` assumes 1-based `id` values and maps them to a 0-based array index by doing `books[id - 1]`. If you change data storage, adjust indexing accordingly.
* When implementing POST/PUT/DELETE, ensure you keep the `id` uniqueness guarantee (auto-increment or UUIDs).
* Consider returning consistent JSON responses (e.g., `{ success: true, data: ..., error: null }`) instead of plain strings for not-found cases.

---

## ✅ Requirements

* Node.js v16+ (recommended)
* npm

---

## 📜 License

MIT
