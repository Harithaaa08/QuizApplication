const express = require("express");
const router = express.Router();

const questions = require("../data/questions.json");

// Send questions without correct answers
router.get("/questions", (req, res) => {
  const safeQuestions = questions.map((q) => ({
    id: q.id,
    question: q.question,
    options: q.options.map((option) => ({
      id: option.id,
      text: option.text,
    })),
  }));

  res.json(safeQuestions);
});

// Validate answer
router.post("/answer", (req, res) => {
  const { questionId, answerId } = req.body;

  const question = questions.find((q) => q.id === Number(questionId));

  if (!question) {
    return res.status(404).json({
      error: "Question not found",
    });
  }

  const correct = question.answerId === Number(answerId);

  res.json({ correct });
});

module.exports = router;
