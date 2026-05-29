let questions = [];

function shuffleArray(array) {
  let arr = [...array]; // avoid modifying original

  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));

    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

async function loadQuestions() {
  try {
    const response = await fetch("questions.json");

    allQuestions = await response.json();

    startQuiz();
  } catch (error) {
    console.log("Error Loading Questionns:", error);
  }
}

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreElement = document.getElementById("score");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;

  scoreElement.innerHTML = "";

  nextButton.innerHTML = "Next";
  nextButton.onclick = null;

  //shuffle everytime the quiz starts
  let data = shuffleArray([...allQuestions]);
  questions = data.slice(0, 5);

  //shuffle options

  questions.forEach((question) => {
    question.answers = shuffleArray([...question.answers]);
  });

  showQuestion();
}

function showQuestion() {
  resetState();

  let currentQuestion = questions[currentQuestionIndex];

  questionElement.innerHTML = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");

    button.innerHTML = answer.text;

    button.classList.add("btn");

    answerButtons.appendChild(button);

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";

  scoreElement.innerHTML = "";

  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;

  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    score++;
    selectedBtn.style.background = "green";
  } else {
    selectedBtn.style.background = "red";
  }

  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.style.background = "green";
    }

    button.disabled = true;
  });

  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  resetState();

  questionElement.innerHTML = `Quiz Finished!`;

  scoreElement.innerHTML = `Your Score: ${score} / ${questions.length}`;

  nextButton.innerHTML = "Play Again";

  nextButton.style.display = "block";

  nextButton.onclick = startQuiz;
}

loadQuestions();
