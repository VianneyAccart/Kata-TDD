export default class Cart {
    private total = 0
    private books: number[] = []
    private readonly unitPrice = 8;

    private discountMap: {[key: number]: number } = {
        2: 5,
        3: 10,
        4: 15,
        5: 20,
        6: 25,
        7: 30
    };  

    add(books: number[]) {
        books.forEach(book => {
            this.total += this.unitPrice
            this.books.push(book)
        });
    };

    getTotal() {
        this.computeDiscount()
        return this.total
    }

    private computeDiscount() {
        let uniqueBookCount = new Set(this.books)
        const discount = this.discountMap[uniqueBookCount.size] || 0;
        this.applyPercentDiscount(discount)

        if (this.cartContainsSimpleBatch(uniqueBookCount)) {
            this.applyPercentDiscount(10)
        }
    }

    private cartContainsSimpleBatch(cart: Set<number>) {
        return cart.has(1) && cart.has(2) && cart.has(3)
    }

    private applyPercentDiscount(discount: number) {
        this.total = this.total * (100-discount)/100
    }
}