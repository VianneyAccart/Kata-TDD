import Hangman from "./hangman";

describe("Hangman Game", () => {
    it("should return ###### if not guess has been made", () => {
        const wordToGuess = "thomas"
        const hangman = new Hangman(wordToGuess);

        const guessState = hangman.result()

        expect(guessState).toEqual("######");
    })

    it("should return 0 guess miss when no guess has been made", () => {
        const wordToGuess = "thomas"
        const hangman = new Hangman(wordToGuess)

        const mistakeCount = hangman.mistakeCount()

        expect(mistakeCount).toBe(0);
    })

    it("should display t two times when guess equals t", () => {
        const wordToGuess = "tomate"
        const hangman = new Hangman(wordToGuess)

        hangman.guess("t");
        const guessState = hangman.result()

        expect(guessState).toEqual("t###t#");
    })

    it("should loose the game if ten mistakes", () => {
        const wordToGuess = "tomate"
        const hangman = new Hangman(wordToGuess)

        for (let guess = 0; guess < 10; guess++) {
            hangman.guess("z");
        }
        
        const gameState = hangman.result()

        expect(gameState).toEqual("Loose");
    })

    it("should win the game if word is guessed", () => {
        const wordToGuess = "tomate"
        const hangman = new Hangman(wordToGuess)

        const letters = ["t", "o", "m", "a", "e"]

        for (let char = 0; char < letters.length; char++) {
            hangman.guess(letters[char]);
        }
        
        const gameState = hangman.result()

        expect(gameState).toEqual("Win");
    })

/*     it("should increment mistake count if the suggested word is wrong", () => {
        const wordToGuess = "tomate"
        const hangman = new Hangman(wordToGuess)
        
        const gameState = hangman.result()

        expect(gameState).toEqual("Win");
    }) */
})