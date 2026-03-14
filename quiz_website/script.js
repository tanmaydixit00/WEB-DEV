/* ===============================
   Quiz Data (Questions & Answers)
   =============================== */
const quizData = [
    {
        question: "Which language is used to build web pages?",
        options: {
            a: "Python",
            b: "HTML",
            c: "Java",
            d: "C++"
        },
        correct: "b"
    },
    {
        question: "Which language is used for styling web pages?",
        options: {
            a: "HTML",
            b: "Java",
            c: "CSS",
            d: "Python"
        },
        correct: "c"
    },
    {
        question: "Which language adds interactivity to websites?",
        options: {
            a: "CSS",
            b: "HTML",
            c: "JavaScript",
            d: "SQL"
        },
        correct: "c"
    }
];

/* ===============================
   Variables
   =============================== */
let currentIndex = 0;
let score = 0;
let userAnswers = [];

/* ===============================
   DOM Elements
   =============================== */
const questionEl = document.getElementById("question");
const optA = document.getElementById("optA");
const optB = document.getElementById("optB");
const optC = document.getElementById("optC");
const optD = document.getElementById("optD");
const options = document.getElementsByName("option");

/* ===============================
   Load Question
   =============================== */
function loadQuestion() {
    clearSelection();

    let currentQuestion = quizData[currentIndex];

    questionEl.innerText = currentQuestion.question;
    optA.innerText = currentQuestion.options.a;
    optB.innerText = currentQuestion.options.b;
    optC.innerText = currentQuestion.options.c;
    optD.innerText = currentQuestion.options.d;

    // Restore previously selected answer (if any)
    if (userAnswers[currentIndex]) {
        document.querySelector(
            `input[value="${userAnswers[currentIndex]}"]`
        ).checked = true;
    }
}

/* ===============================
   Get Selected Option
   =============================== */
function getSelectedOption() {
    let selected = null;
    options.forEach((opt) => {
        if (opt.checked) {
            selected = opt.value;
        }
    });
    return selected;
}

/* ===============================
   Clear Radio Selection
   =============================== */
function clearSelection() {
    options.forEach((opt) => (opt.checked = false));
}

/* ===============================
   Next Button
   =============================== */
function next() {
    const selectedAnswer = getSelectedOption();

    if (selectedAnswer === null) {
        alert("Please select an option!");
        return;
    }

    userAnswers[currentIndex] = selectedAnswer;

    currentIndex++;

    if (currentIndex < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

/* ===============================
   Previous Button
   =============================== */
function prev() {
    if (currentIndex > 0) {
        currentIndex--;
        loadQuestion();
    }
}

/* ===============================
   Show Final Result
   =============================== */
function showResult() {
    score = 0;

    quizData.forEach((q, index) => {
        if (userAnswers[index] === q.correct) {
            score++;
        }
    });

    document.querySelector(".quiz-container").innerHTML = `
        <h2>Quiz Completed 🎉</h2>
        <p>Your Score: <strong>${score} / ${quizData.length}</strong></p>
        <button onclick="location.reload()">Restart Quiz</button>
    `;
}

/* ===============================
   Initial Load
   =============================== */
loadQuestion();
