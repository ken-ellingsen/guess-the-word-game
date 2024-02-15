const guessedLettersDisplay = document.querySelector(`.guessed-letters`); // unordered list for player guesses
const button = document.querySelector('button'); // "Guess!" button
const guess = document.querySelector('input'); // letter input
const wordInProgress = document.querySelector(".word-in-progress"); // word in progress paragraph
const remainingGuesses = document.querySelector(`.remaining`); // paragraph displaying remaining guesses message
const numberGuesses = document.querySelector('span'); // line indicating how many guesses are left
const guessMessage = document.querySelector(`.message`); // paragraph where messages appear after guessing a letter
const playAgainButton = document.querySelector(`.play-again`); // hidden "Play Again!" button

const word = `magnolia`; // Placeholder test word
const guessedLetters = [];

const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        placeholderLetters.push(`●`)
    }
    wordInProgress.innerText = placeholderLetters.join("");
}
placeholder(word);

button.addEventListener("click", function (e) {
    e.preventDefault();
    const input = guess.value;
    guess.value = '';
    console.log(input);

    guessMessage.innerText = ``;
    inputCheck(input);
    makeGuess(input);
});

const inputCheck = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input === "") {
        guessMessage.innerText = `Please enter a letter.`;
    } else if (input.length > 1) {
        guessMessage.innerText = `Please only enter one letter`;
    } else if (!input.match(acceptedLetter)) {
        guessMessage.innerText = `Please enter a letter from A to Z.`
    } else
    return input
}

const makeGuess = function (letter) {
    letter = letter.toUpperCase();
    if (guessedLetters.includes(letter)){
        guessMessage.innerText = `You've already guessed that, please guess again.`
    } else {
        guessedLetters.push(letter);
        console.log(guessedLetters);
    }
}