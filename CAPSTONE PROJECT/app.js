const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    startButton.innerText = 'Restart';
    startButton.classList.remove('hide');
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

const questions = [
  {
    question: 'Who lives in a pineapple under the sea?',
    answers: [
      { text: 'Homer Simpson', correct: false },
      { text: 'Pokemon', correct: false },
      { text: 'SpongeBob SquarePants', correct: true },
      { text: 'Bugs Bunny', correct: false },
    ],
  },
  {
    question: 'What is the largest land animal on the planet?',
    answers: [
      { text: 'elephant', correct: true },
      { text: 'flamingo', correct: false },
      { text: 'blue whale', correct: false },
      { text: 'ant', correct: false },
    ],
  },
  {
    question: 'What is 4 + 4?',
    answers: [
      { text: '16', correct: false },
      { text: '8', correct: true },
      { text: '0', correct: false },
      { text: '9', correct: false },
    ],
  },
  {
    question: 'What is the average lifespan of a scarlet macaw?',
    answers: [
      { text: '5 years', correct: false },
      { text: '20 years', correct: false },
      { text: '200 years', correct: false },
      { text: '50 years', correct: true },
    ],
  },
];
