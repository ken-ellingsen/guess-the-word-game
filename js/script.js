const guessList = document.querySelector(`.guessed-letters`); // unordered list for player guesses
const guessLetterButton = document.querySelector('.guess'); // "Guess!" button
const guess = document.querySelector('input'); // letter input
const wordInProgress = document.querySelector(".word-in-progress"); // word in progress paragraph
const remainingGuessesMessage = document.querySelector(`.remaining`); // paragraph displaying remaining guesses message
const numberGuesses = document.querySelector('span'); // line indicating how many guesses are left
const guessMessage = document.querySelector(`.message`); // paragraph where messages appear after guessing a letter
const playAgainButton = document.querySelector(`.play-again`); // hidden "Play Again!" button

let word = `magnolia`; // Placeholder test word
const guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function(){
    const res = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await res.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
}

const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        placeholderLetters.push(`●`)
    }
    wordInProgress.innerText = placeholderLetters.join("");
}

getWord();

guessLetterButton.addEventListener("click", function (e) {
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
    if (guessedLetters.includes(letter)) {
        guessMessage.innerText = `You've already guessed that, please guess again.`
    } else {
        guessedLetters.push(letter);
        console.log(guessedLetters);
        updateGuessesRemaining(letter);
        fillGuessList(letter);
        wordUpdate(guessedLetters);
    }
}

const fillGuessList = function () {
    guessList.innerHTML = ``;
    for (const letter of guessedLetters) {
        let li = document.createElement("li");
        li = letter + " ";
        guessList.append(li);
    }
}

const wordUpdate = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = []
    //console.log(wordArray);
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    wordInProgress.innerText = revealWord.join("");
    checkWin(wordInProgress);
}

const updateGuessesRemaining = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        guessMessage.innerText = `Sorry, ${guess} is not in the word. Please guess again.`;
        remainingGuesses -= 1;
    } else {
        guessMessage.innerText = `${guess} is in the word, congrats! Please guess again.`;
    }

    if (remainingGuesses === 0) {
        guessMessage.innerHTML = `Game over! The word was ${word}.`;
        numberGuesses.innerText = '0 guesses';
    } else if (remainingGuesses === 1) {
        numberGuesses.innerText = `1 guess`;
    } else {
        numberGuesses.innerText = `${remainingGuesses} guesses`;
    }
}

const checkWin = function (wordInProgress) {
    if (wordInProgress.innerText === word.toUpperCase()) {
        guessMessage.classList.add("win");
        guessMessage.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`
    }
}