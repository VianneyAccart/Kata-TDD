import { Bowling } from "./bowling";


describe('Bowling game', () => {
    it('should score 0 if gutter game', () => {
        const rolls = Array(20).fill(0);
        const game = new Bowling(rolls)
        expect(game.score()).toBe(0);
    });

    it('should score 20 if all rolls equal 1', () => {
        const rolls = Array(20).fill(1);
        const game = new Bowling(rolls)
        expect(game.score()).toBe(20);
    });

    it('should score 16 for a game with a spare', () => {
        const rolls = [5, 5, 3, ...Array(17).fill(0)];
        const game = new Bowling(rolls)
        expect(game.score()).toBe(16);
    });

    it('should score 150 for a spare game and 5 bonus', () => {
        const rolls = Array(21).fill(5)
        const game = new Bowling(rolls)
        expect(game.score()).toBe(150)
    })

    it('should score 26 for a strike then 5/3', () => {
        const rolls = [10, 5, 3, ...Array(17).fill(0)]
        const game = new Bowling(rolls)
        expect(game.score()).toBe(26)
    })

    it('should score 300 for a perfect game', () => {
        const rolls = Array(12).fill(10)
        const game = new Bowling(rolls)
        expect(game.score()).toBe(300)
    })
});

