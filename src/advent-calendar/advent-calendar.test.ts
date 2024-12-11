import AdventCalendar, { GiftDistribution, InvalidPersonError, InvalidPresentValueError, OnlyOnePersonError, TooManyPresentsError } from "./advent-calendar";

describe("Advent Calendar", () => {
    describe("presents validation", () => {
        it("should return an error if total of presents is greater than 24", () => {
            const people = ["Alice", "Bob"]
            const presents = 13
            const adventCalendar = new AdventCalendar(people, presents)
            expect(() => {
                adventCalendar.distributeGifts();
            }).toThrow(TooManyPresentsError)
        })

        it("should return an error if present count is less than 1", () => {
            const people = ["Alice", "Bob"]
            const presents = 0
            const adventCalendar = new AdventCalendar(people, presents)
            expect(() => {
                adventCalendar.distributeGifts(); 
            }).toThrow(InvalidPresentValueError)
        })

        it("should return an error if present is not an integer", () => {
            const people = ["Alice", "Bob"]
            const presents = 1.5
            const adventCalendar = new AdventCalendar(people, presents)
            expect(() => {
                adventCalendar.distributeGifts();
            }).toThrow(InvalidPresentValueError)
        }) 
    })
    
    describe("persons validation", () => {
        it("should return an error if there's no person", () => {
            const people: string[] = []
            const presents = 1
            const adventCalendar = new AdventCalendar(people, presents)
            expect(() => {
                adventCalendar.distributeGifts();
            }).toThrow(InvalidPersonError)
        })

        it("should return an error if there's only one person", () => {
            const people = ["Alice"]
            const presents = 2
            const adventCalendar = new AdventCalendar(people, presents)
            expect(() => {
                adventCalendar.distributeGifts();
            }).toThrow(OnlyOnePersonError) 
        })

        it("should return an error if a person name is empty", () => {
            const people = ["Alice", "  "]
            const presents = 1
            const adventCalendar = new AdventCalendar(people, presents)
            expect(() => {
                adventCalendar.distributeGifts();
            }).toThrow(InvalidPersonError)
        }) 
    })

    it("Alice and Bob should place and open two presents", () => {
        const people = ["Alice", "Bob"]
        const presents = 2
        const adventCalendar = new AdventCalendar(people, presents)
        const result = adventCalendar.distributeGifts()

        expect(result.get("Alice")!.toPlace.length).toBe(2)
        expect(result.get("Bob")!.toPlace.length).toBe(2)
        expect(filledPresentsEqualsOpenedPresents(people, result)).toBe(true)
    })

    it("All of the 6 people should place four presents and open four presents", () => {
        const people = ["Alice", "Bob", "Carl", "David", "Eric", "Fred"]
        const presents = 4
        const adventCalendar = new AdventCalendar(people, presents)
        const result = adventCalendar.distributeGifts()

        expect(result.get("Alice")!.toPlace.length).toBe(4)
        expect(result.get("Bob")!.toPlace.length).toBe(4)
        expect(result.get("Carl")!.toPlace.length).toBe(4)
        expect(result.get("David")!.toPlace.length).toBe(4)
        expect(result.get("Eric")!.toPlace.length).toBe(4)
        expect(result.get("Fred")!.toPlace.length).toBe(4)
        expect(filledPresentsEqualsOpenedPresents(people, result)).toBe(true)
    })

    it("should not open its own presents", () => {
        const people = ["Alice", "Bob"]
        const presents = 2
        const adventCalendar = new AdventCalendar(people, presents)
        const result = adventCalendar.distributeGifts()

        expect(result.get("Alice")!.toPlace).not.toStrictEqual(result.get("Alice")!.toOpen)
        expect(result.get("Bob")!.toPlace).not.toStrictEqual(result.get("Bob")!.toOpen)
        expect(filledPresentsEqualsOpenedPresents(people, result)).toBe(true)
    })

    it("should distribute gifts even if people count is odd", () => {
        const people = ["Alice", "Bob", "Carl"]
        const presents = 2
        const adventCalendar = new AdventCalendar(people, presents)
        const result = adventCalendar.distributeGifts()

        expect(result.get("Alice")!.toPlace.length).toBe(2)
        expect(result.get("Bob")!.toPlace.length).toBe(2)
        expect(result.get("Carl")!.toPlace.length).toBe(2)
        expect(filledPresentsEqualsOpenedPresents(people, result)).toBe(true)
    })

    const filledPresentsEqualsOpenedPresents = (people: string[], result: Map<string, GiftDistribution>) => {
        let filled: number[] = []
        let opened: number[] = []

        people.forEach(p => {
            result.get(p)?.toPlace.forEach(g => filled.push(g))
            result.get(p)?.toOpen.forEach(g => opened.push(g))
        })

        filled = filled.sort((a, b) => a - b)
        opened = opened.sort((a, b) => a - b)

        return JSON.stringify(filled) == JSON.stringify(opened); 
    }
});