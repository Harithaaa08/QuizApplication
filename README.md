# QuizApplication

A simple Quiz Application built with HTML, CSS, JavaScript, Node.js, and Express.

## Features

- Displays one question at a time
- Randomly selects 5 questions for each quiz attempt
- Randomizes answer options
- Tracks the user's score
- Prevents users from viewing correct answers before submission
- Validates answers on the backend
- Uses JSON-based in-memory storage (no database required)
- Displays a final score summary screen
- Includes a Play Again option

## Project Structure

```text
QuizApplication/
│
├── Frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
└── Backend/
    ├── data/
    │   └── questions.json
    ├── routes/
    │   └── questionRoutes.js
    ├── server.js
    └── package.json
```

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
- Node.js
- Express.js

## Installation & Run Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Harithaaa08/QuizApplication.git
```

### 2. Navigate to Backend

```bash
cd QuizApplication/Backend
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Server

```bash
npm start
```

or (if nodemon is configured)

```bash
npm run dev
```

### 5. Open the Application

Open the browser and visit:

```text
http://localhost:4000
```

## API Endpoints

### Get Questions

```http
GET /api/questions
```

Returns quiz questions without exposing correct answers.

### Validate Answer

```http
POST /api/answer
```

Request Body:

```json
{
  "questionId": 1,
  "answerId": 2
}
```

Response:

```json
{
  "correct": true
}
```

## Future Enhancements

- User authentication
- Timer for questions
- Difficulty levels
- MongoDB database integration
- Leaderboard and score history

## Author

Haritha Surampelli
