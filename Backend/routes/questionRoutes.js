const express = require("express");
const router = express.Router();

const questions = require("../data/questions.json");

// GET QUESTIONS (NO ANSWER EXPOSED)
router.get("/questions", (req, res) => {
  const safeQuestions = questions.map((q) => ({
    id: q.id,
    question: q.question,
    options: q.options.map((opt) => ({
      id: opt.id,
      text: opt.text,
    })),
  }));

  res.json(safeQuestions);
});

// CHECK ANSWER
router.post("/answer", (req, res) => {
  const { questionId, answerId } = req.body;

  const question = questions.find((q) => q.id === Number(questionId));

  if (!question) {
    return res.status(404).json({ error: "Question not found" });
  }

  const isCorrect = question.answerId === Number(answerId);

  res.json({
    correct: isCorrect,
  });
});

module.exports = router;
