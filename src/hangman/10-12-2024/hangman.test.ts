import Hangman from "./hangman";

describe("Hangman Game", () => {
    it("should return ###### if not guess has been made", () => {
        const wordToGuess = "thomas"
        const hangman = new Hangman(wordToGuess);

        const gameState = hangman.gameState()
        const expectedGameState = {
            state: "In progress",
            mistakes: 0,
            guessResult: "######"
        }

        expect(gameState).toStrictEqual(expectedGameState);
    })

    it("should return 0 mistakes when no guess has been made", () => {
        const wordToGuess = "thomas"
        const hangman = new Hangman(wordToGuess)

        const gameState = hangman.gameState()
        const expectedGameState = {
            state: "In progress",
            mistakes: 0,
            guessResult: "######"
        }

        expect(gameState).toStrictEqual(expectedGameState);
    })

    it("should display t two times when guess equals t", () => {
        const wordToGuess = "tomate"
        const hangman = new Hangman(wordToGuess)

        hangman.guess("t");
        const gameState = hangman.gameState()
        const expectedGameState = {
            state: "In progress",
            mistakes: 0,
            guessResult: "t###t#"
        }

        expect(gameState).toStrictEqual(expectedGameState);
    })

    it("should loose the game if ten mistakes", () => {
        const wordToGuess = "tomate"
        const hangman = new Hangman(wordToGuess)

        for (let guess = 0; guess < 10; guess++) {
            hangman.guess("z");
        }
        
        const gameState = hangman.gameState()
        const expectedGameState = {
            state: "Loose",
            mistakes: 10,
            guessResult: "######"
        }

        expect(gameState).toStrictEqual(expectedGameState);
    })

    it("should win the game if word is guessed", () => {
        const wordToGuess = "tomate"
        const hangman = new Hangman(wordToGuess)

        const letters = ["t", "o", "m", "a", "e"]

        for (let char = 0; char < letters.length; char++) {
            hangman.guess(letters[char]);
        }
        
        const gameState = hangman.gameState()
        const expectedGameState = {
            state: "Win",
            mistakes: 0,
            guessResult: "tomate"
        }

        expect(gameState).toStrictEqual(expectedGameState);
    })
})