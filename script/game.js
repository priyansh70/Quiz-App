const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));

const progressText = document.getElementById('progressText')
const scoreText = document.getElementById('score');

const progressBarFull = document.getElementById('progressBarFull');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// Dummy Questions 
let questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript??',
        choice1: '<script>',
        choice2: '<javascript>',
        choice3: '<js>',
        choice4: '<scripting>',
        answer: 1,
    },
    {
        question:
            "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script name='xxx.js'>",
        choice3: "<script src='xxx.js'>",
        choice4: "<script file='xxx.js'>",
        answer: 3,
    },
    {
        question: " How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4,
    },
];

// CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTION = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    // console.log(availableQuestions);
    getNewQuestion();
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTION) {
        // go to the end page
        return window.location.assign("/end.html");
    };

    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTION}`;

    // Update the progress bar 
    // console.log((questionCounter / MAX_QUESTION) * 100)

    progressBarFull.style.width = `${(questionCounter / MAX_QUESTION) * 100}%`

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);

    currentQuestion = availableQuestions[questionIndex];
    // console.log(currentQuestion);

    // Set Question 
    question.innerText = currentQuestion.question;

    // Set Choices 
    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion["choice" + number];
    });

    // Pop up current question 
    availableQuestions.splice(questionIndex, 1);
    // console.log(availableQuestions);

    acceptingAnswers = true;
};


choices.forEach(choice => {
    choice.addEventListener("click", (e) => {
        // console.log(e.target);
        if (!acceptingAnswers) return;

        acceptingAnswers = false;

        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        // console.log(selectedAnswer);
        // console.log(selectedAnswer == currentQuestion.answer)

        // Add class for correct and incorrect choice of option.
        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }

        // console.log(classToApply);
        console.log(selectedChoice.parentElement);
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = num => {
    score += num;
    // console.log(score);
    scoreText.innerText = score;
};

startGame();