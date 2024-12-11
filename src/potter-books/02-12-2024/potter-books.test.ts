import Cart from "./potter-books";

describe("Potter books discount", () => {
    let cart: Cart

    beforeEach(() => {
        cart = new Cart()  
    })

    it("Should cost $8 for buying one book", () => {
        cart.add([1])
        expect(cart.getTotal()).toBe(8);
    })

    it("Should cost $16 for buying two times the same book", () => {
        cart.add([1, 1])
        expect(cart.getTotal()).toBe(16);
    })

    it("Should cost $15.20 for buying two different books", () => {
        cart.add([1, 2])
        expect(cart.getTotal()).toBe(15.2);
    })

    it("Should cost $21.6 for buying three different books", () => {
        cart.add([1, 2, 4])
        expect(cart.getTotal()).toBe(21.6);
    })

    it("Should cost $35.28 for buying seven different books with batch containing books 1, 2 and 3", () => {
        cart.add([1, 2, 3, 4, 5, 6, 7])
        expect(cart.getTotal()).toBe(35.28);
    })
})