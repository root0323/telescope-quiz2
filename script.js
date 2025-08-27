const startButton = document.getElementById('start-btn');
const restartButton = document.getElementById('restart-btn');
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');

let shuffledQuestions, currentQuestionIndex;
let score = 0;
let timer;
let timeLeft = 30;


const questions = [
    {
        question: '망원경의 분해능은 어떤 의미를 갖고 있을까?',
        answers: [
            { text: '어두운 별을 볼 수 있는 능력', correct: false },
            { text: '두 물체를 구분할 수 있는 능력', correct: true },
            { text: '색을 정확히 구분할 수 있는 능력', correct: false },
            { text: '배율을 크게 할 수 있는 능력', correct: false }
        ]
    },
    {
        question: '분해능이 클수록 관측하기 좋은 망원경이다?',
        answers: [
            { text: 'O', correct: false },
            { text: 'X', correct: true }
        ]
    },
    {
        question: '서로 다른 볼록렌즈에서 물체와 가까운 볼록렌즈의 초점거리는 10m, 눈과 가까운 볼록렌즈의 초점거리는 5cm일 때 물체는 몇 배더 크게 보일까?',
        answers: [
            { text: '50', correct: false },
            { text: '100', correct: false },
            { text: '200', correct: true },
            { text: '400', correct: false }
        ]
    },
    {
        question: '항성을 찾아라',
        answers: [
            { text: '알타이르', correct: false },
            { text: '알데바란', correct: false },
            { text: '베가', correct: true },
            { text: '스피카', correct: false }
        ]
    },
    {
        question: '망원경의 구경이 커질수록 얻는 가장 중요한 이점은?',
        answers: [
            { text: '더 밝은 상 획득', correct: true },
            { text: '색수차 감소', correct: false },
            { text: '접안렌즈 교환 쉬워짐', correct: false },
            { text: '시야각의 확장', correct: false }
        ]
    }
];
// =================================================
// 여기까지 퀴즈 문제입니다.
// =================================================


startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);

function startGame() {
    score = 0;
    startScreen.style.display = 'none';
    resultScreen.style.display = 'none';
    quizScreen.style.display = 'block';
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    if (currentQuestionIndex < shuffledQuestions.length) {
        showQuestion(shuffledQuestions[currentQuestionIndex]);
        timeLeft = 30;
        timerElement.innerText = timeLeft;
        startTimer();
    } else {
        showResult();
    }
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
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

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            selectAnswer({ target: null });
        }
    }, 1000);
}

function resetState() {
    clearInterval(timer);
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    clearInterval(timer);
    const selectedButton = e.target;
    const correct = selectedButton && selectedButton.dataset.correct === 'true';

    if (correct) {
        score++;
    }

    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });

    setTimeout(() => {
        currentQuestionIndex++;
        setNextQuestion();
    }, 1500);
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('incorrect');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('incorrect');
}

function showResult() {
    quizScreen.style.display = 'none';
    resultScreen.style.display = 'block';
    scoreElement.innerText = `총 ${questions.length}문제 중 ${score}문제를 맞혔습니다!`;
}
