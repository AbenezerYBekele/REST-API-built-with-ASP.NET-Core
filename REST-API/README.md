
## Trivia Game & Example REST API
  This repository contains two main components:\
  1. A functional, web-based Trivia Game that fetches questions from a public API and allows users to play.\
  2. A separate, self-contained Example REST API (RESTapi.js) that demonstrates how to build a full CRUD (Create, Read, Update, Delete) server with Node.js and Express.\
\
The primary application is the trivia game. The RESTapi.js file is included as a standalone educational example and is not used by the main trivia game.
## Part 1: The Trivia Game
  The trivia game is a client-server application where the frontend (index.html and client.js) communicates with a Node.js backend (server.js). The backend acts as a simple proxy, fetching quiz questions from the public Open Trivia Database and serving them to the client.
  Key Features
 * **Live Data**: Questions are fetched in real-time from the Open Trivia Database.
 * **Multiple Categories**: Play quizzes from five different categories: General Knowledge, History, Politics, Mythology, and Geography.
 * **Dynamic UI**: The quiz interface is built dynamically with vanilla JavaScript. Questions are loaded, and results are calculated without ever reloading the page.
 * **Simple Backend**: The Express.js server (server.js) has a single responsibility: to fetch data from the external API for the frontend.

## Part 2: The Example REST API (RESTapi.js)
Included in this repository is RESTapi.js, a standalone file that creates a complete REST API for managing a list of custom trivia questions.
Purpose
This file is a practical example of how to build a REST API with Node.js that can:
* **Create**: Add new questions.
* **Read**: Get a list of all questions or a single question by its ID.
* **Update**: Modify an existing question.
* **Delete**: Remove a question.

**Note:** This API operates on an in-memory array, meaning any questions you add, update, or delete will be lost when the server is stopped. It is designed for demonstration purposes.
\
## Getting Started

### Prerequisites
*   [Node.js](https://nodejs.org/) and `npm` must be installed on your machine.

### Installation
1.  Clone the repository:
    ```bash
    git clone https://your-repository-url.git
    ```
2.  Navigate into the project directory:
    ```bash
    cd your-repository-name
    ```
3.  Install the required dependencies:
    ```bash
    npm install express axios body-parser cors
    ```

## How to Run

You can run either the Trivia Game server or the example REST API server. Since they are both configured for port 3000, they cannot be run at the same time without modification.

### Option A: Run the Trivia Game
This will start the server that the `index.html` page needs to fetch quiz questions.

1.  In your terminal, run the following command:
    ```bash
    node server.js
    ```
    You should see the message: `Server is running on port 3000`

2.  Open the `webapp/index.html` file in your web browser. You can now select a category and play the game.

### Option B: Run the Example REST API
This will start the standalone CRUD API. You can use a tool like [Postman](https://www.postman.com/) or `curl` to interact with it.

1.  In your terminal, run the following command:
    ```bash
    node RESTapi.js
    ```
    You should see the message: `Trivia REST API running at http://localhost:3000`

2.  The API is now running. You can send requests to its endpoints as documented below.

## API Endpoint Documentation

### Trivia Game API (`server.js`)
These are the endpoints used by the game's frontend to get questions from the Open Trivia Database.

| Method | Endpoint          | Description                                    |
| :----- | :---------------- | :--------------------------------------------- |
| `GET`  | `/api/general`    | Fetches 10 general knowledge questions.        |
| `GET`  | `/api/history`    | Fetches 10 history questions.                  |
| `GET`  | `/api/politic`    | Fetches 10 politics questions.                 |
| `GET`  | `/api/mythology`  | Fetches 10 mythology questions.                |
| `GET`  | `/api/geography`  | Fetches 10 geography questions.                |


### Example CRUD API (`RESTapi.js`)
These are the endpoints for the standalone example API for managing custom questions.

| Method   | Endpoint              | Description                                                |
| :------- | :-------------------- | :--------------------------------------------------------- |
| `GET`    | `/api/questions`      | Get all questions. Supports `?category=` filter.           |
| `GET`    | `/api/questions/:id`  | Get a single question by its ID.                           |
| `POST`   | `/api/questions`      | Create a new question. Requires a JSON body.               |
| `PUT`    | `/api/questions/:id`  | Update an existing question. Requires a JSON body.         |
| `DELETE` | `/api/questions/:id`  | Delete a question by its ID.                               |
