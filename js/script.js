const guessedLettersElement = document.querySelector(`.guessed-letters`); // unordered list for player guesses
const guessLetterButton = document.querySelector('.guess'); // "Guess!" button
const letterInput = document.querySelector('input'); // letter input
const wordInProgress = document.querySelector(".word-in-progress"); // word in progress paragraph
const remainingGuessesElement = document.querySelector(`.remaining`); // paragraph displaying remaining guesses message
const remainingGuessesSpan = document.querySelector('span'); // line indicating how many guesses are left
const message = document.querySelector(`.message`); // paragraph where messages appear after guessing a letter
const playAgainButton = document.querySelector(`.play-again`); // hidden "Play Again!" button

let word = `magnolia`; // Placeholder test word
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const res = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await res.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};

// Starts game
getWord();

const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        placeholderLetters.push(`●`);
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

guessLetterButton.addEventListener("click", function (e) {
    e.preventDefault();

    message.innerText = ``;

    const guess = letterInput.value;

    const goodGuess = validateInput(guess);

    if (goodGuess) {
        makeGuess(guess);
    }
    letterInput.value = '';
});

const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = `Please enter a letter.`;
    } else if (input.length > 1) {
        message.innerText = `Please only enter one letter`;
    } else if (!input.match(acceptedLetter)) {
        message.innerText = `Please enter a letter from A to Z.`
    } else
        return input;
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = `You've already guessed that, please guess again.`
    } else {
        guessedLetters.push(guess);
        updateGuessesRemaining(guess);
        showGuessedLetters();
        updateWordInProgress(guessedLetters);
    }
};

const showGuessedLetters = function () {
    guessedLettersElement.innerHTML = ``;
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    wordInProgress.innerText = revealWord.join("");
    checkIfWin();
};

const updateGuessesRemaining = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        message.innerText = `Sorry, ${guess} is not in the word. Please guess again.`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `${guess} is in the word, congrats! Please guess again.`;
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
        remainingGuessesSpan.innerText = '0 guesses';
        startOver();
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `1 guess`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};

const checkIfWin = function () {
    if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`
        startOver();
    }
};

const startOver = function () {
    guessLetterButton.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function () {
    message.classList.remove("win");
    guessedLetters = [];
    remainingGuesses = 8;
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    guessedLettersElement.innerHTML = "";
    message.innerText = "";

    getWord()

    guessLetterButton.classList.remove("hide");
    playAgainButton.classList.add("hide");
    remainingGuessesElement.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
});