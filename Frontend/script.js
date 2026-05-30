let questions = [];
let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreElement = document.getElementById("score");

async function loadQuestions() {
  const response = await fetch("http://localhost:4000/api/questions");

  questions = await response.json();

  startQuiz();
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreElement.textContent = "";
  nextButton.textContent = "Next";
  nextButton.onclick = nextQuestion;

  shuffleArray(questions);
  questions = questions.slice(0, 5);

  showQuestion();
}

function showQuestion() {
  resetState();

  const currentQuestion = questions[currentQuestionIndex];

  questionElement.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

  const options = [...currentQuestion.options];
  shuffleArray(options);

  options.forEach((option) => {
    const button = document.createElement("button");
    button.classList.add("btn");
    button.textContent = option.text;

    button.onclick = () => selectAnswer(currentQuestion.id, option.id, button);

    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  answerButtons.innerHTML = "";
}

async function selectAnswer(questionId, answerId, button) {
  const response = await fetch("http://localhost:4000/api/answer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ questionId, answerId }),
  });

  const result = await response.json();

  // disable all buttons first
  Array.from(answerButtons.children).forEach((btn) => {
    btn.disabled = true;
  });

  // mark correct answer (IMPORTANT FIX)
  Array.from(answerButtons.children).forEach((btn) => {
    const text = btn.textContent;

    // find correct answer from API response OR compare logic
    if (btn.textContent === result.correctAnswer) {
      btn.classList.add("correct");
    }
  });

  // mark selected answer
  if (result.correct) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
  }

  nextButton.style.display = "block";
}

function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  resetState();

  questionElement.textContent = "🎉 Quiz Completed!";
  scoreElement.textContent = `Your Score: ${score} / ${questions.length}`;

  nextButton.textContent = "Play Again";
  nextButton.style.display = "block";

  nextButton.onclick = () => {
    startQuiz(); // no reload (better UX)
  };
}

loadQuestions();
