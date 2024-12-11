import TennisGame from "./tennis"

describe("Tennis Game", (() => {
    it("Should display empty score for no scored point", () => {
        const playerPerformances: string[] = []
        const tennis = new TennisGame(playerPerformances)
        const expectedScore = [
            ["A","0","0","0","0","0","0"], 
            ["B","0","0","0","0","0","0"]
        ]
        expect(tennis.score()).toStrictEqual(expectedScore)
    })

    it("Should display 15 if A player score one point", () => {
        const playerPerformances: string[] = ["A"]
        const tennis = new TennisGame(playerPerformances)
        const expectedScore = [
            ["A","0","0","0","0","0","15"], 
            ["B","0","0","0","0","0","0"]
        ]
        expect(tennis.score()).toStrictEqual(expectedScore)
    })

    it("Should display 40 for A and 30 for B", () => {
        const playerPerformances: string[] = ["A","B","A","B","A"]
        const tennis = new TennisGame(playerPerformances)
        const expectedScore = [
            ["A","0","0","0","0","0","40"], 
            ["B","0","0","0","0","0","30"]
        ]
        expect(tennis.score()).toStrictEqual(expectedScore)
    })

    it("Should display 1 game for A player and 0 points for both", () => {
        const playerPerformances: string[] = ["A","B","A","B","A","A"]
        const tennis = new TennisGame(playerPerformances)
        const expectedScore = [
            ["A","1","0","0","0","0","0"], 
            ["B","0","0","0","0","0","0"]
        ]
        expect(tennis.score()).toStrictEqual(expectedScore)
    })

    it("Should display advantage for A player", () => {
        const playerPerformances: string[] = ["A","B","A","B","A","B","A"]
        const tennis = new TennisGame(playerPerformances)
        const expectedScore = [
            ["A","0","0","0","0","0","advantage"], 
            ["B","0","0","0","0","0","0"]
        ]
        expect(tennis.score()).toStrictEqual(expectedScore)
    })
}))