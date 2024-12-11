import Molkky from "./molkky";

describe("Molkky", () => {
    it("should score 0 if no throws has fallen", () => {
        const throws: number[][] = [[]]
        const game = new Molkky(throws)
        expect(game.score()).toBe(0);
    })

    it ("should score the count of fallen pins", () => {
        const throws = [[1, 12]];
        const game = new Molkky(throws)
        expect(game.score()).toBe(2);
    })

    it ("should score the value of the fallen pin if only one has fallen", () => {
        const throws = [[12]];
        const game = new Molkky(throws)
        expect(game.score()).toBe(12);
    })

    it("should win the game if score is 50", () => {
        const throws = [[12],[12],[12],[12],[2]];
        const game = new Molkky(throws)
        expect(game.score()).toBe(50);
        expect(game.hasWon()).toBe(true);
    })

    it("should lose the game if player score 0 three consecutive times", () => {
        const throws = [[],[],[]];
        const game = new Molkky(throws)
        expect(game.score()).toBe(0);
        expect(game.hasLose()).toBe(true);
    })

    it("should not lose the game if player score three times 0 but not consecutively", () => {
        const throws = [[],[1],[],[]];
        const game = new Molkky(throws)
        expect(game.score()).toBe(1);
        expect(game.hasLose()).toBe(false);
    })

    it("should bring the score to 25 is score in greater than 50", () => {
        const throws = [[12],[12],[12],[12],[3]];
        const game = new Molkky(throws)
        expect(game.score()).toBe(25);
        expect(game.hasWon()).toBe(false);
    })

    it("should score 26 after scoring more than 50, then re-score", () => {
        const throws = [[12],[12],[12],[12],[3],[1]];
        const game = new Molkky(throws)
        expect(game.score()).toBe(26);
        expect(game.hasWon()).toBe(false);
    })
})