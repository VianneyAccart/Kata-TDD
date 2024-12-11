export type GiftDistribution = {
    toPlace: number[];
    toOpen: number[];
}

export class TooManyPresentsError extends Error {
    constructor(msg?: string) {
        super(msg);
    }
}

export class OnlyOnePersonError extends Error {
    constructor(msg?: string) {
        super(msg);
    }
}

export class InvalidPersonError extends Error {
    constructor(msg?: string) {
        super(msg);
    }
}

export class InvalidPresentValueError extends Error {
    constructor(msg?: string) {
        super(msg);
    }
}

export default class AdventCalendar {
    private toFill: string[] | null[] = Array(24).fill(null);
    private toOpen: string[] | null[] = Array(24).fill(null);
    private giftDistribution = new Map()

    constructor(private people: string[], private presents: number) {} 

    distributeGifts(): Map<string, GiftDistribution> {
        this.validateInputs()
        this.assignSlotsToFill()
        this.assignSlotsToOpen()
        return this.giftDistribution;
    }

    private tooManyPresents() {
        return this.people.length * this.presents > 24 
    }

    private onlyOnePerson() {
        return this.people.length === 1
    }

    private lessThanOnePerson() {
        return this.people.length < 1
    }

    private atLeastOnePersonNameIsEmpty() {
        let isEmptyValue = false
        for (let i = 0; i < this.people.length; i ++) {
            if (this.people[i].trim().length === 0) {
                isEmptyValue = true
                break;
            }
        }
        return isEmptyValue
    }

    private lessThanOnePresent() {
        return this.presents < 1
    }

    private presentIsNotAnInteger() {
        return !Number.isInteger(this.presents)
    }

    private validateInputs() {
        if (this.tooManyPresents()) {
            throw new TooManyPresentsError
        }

        if (this.lessThanOnePerson() || this.atLeastOnePersonNameIsEmpty()) {
            throw new InvalidPersonError
        }

        if (this.onlyOnePerson()) {
            throw new OnlyOnePersonError
        }

        if (this.lessThanOnePresent() || this.presentIsNotAnInteger()) {
            throw new InvalidPresentValueError
        }
    }

    private assignSlotsToFill() {
        for (let i = 0; i < this.people.length; i++) {
            const currentPerson = this.people[i]
            this.giftDistribution.set(currentPerson, {toPlace: [], toOpen: []})

            let placed = 0;

            while (placed < this.presents) {
                const slots = Array.from(Array(this.toFill.length).keys());
                const availableSlot = slots.filter((slot) => this.toFill[slot] === null);
                const slot = availableSlot[Math.floor(Math.random() * availableSlot.length)];
                this.toFill[slot] = currentPerson

                const gift = this.giftDistribution.get(currentPerson);
                gift.toPlace.push(slot + 1);
                gift.toPlace.sort((a: number, b: number) => a - b);
                this.giftDistribution.set(currentPerson, gift); 

                placed++ 
            }
        }
    }

    private assignSlotsToOpen() {
        for (let i = 0; i < this.people.length; i++) {
            const currentPerson = this.people[i]

            let toFillCopy = this.toFill
            let opened = 0;

            while (opened < this.presents) {
                const slots = Array.from(Array(toFillCopy.length).keys());
                const assignedSlot = slots.filter((slot) => toFillCopy[slot] != null 
                    && toFillCopy[slot] !== currentPerson);

                if (assignedSlot.length === 0) {
                    break;
                }

                const slot = assignedSlot[Math.floor(Math.random() * assignedSlot.length)];
                toFillCopy[slot] = null
                this.toOpen[slot] = currentPerson

                const gift = this.giftDistribution.get(currentPerson);
                gift.toOpen.push(slot + 1);
                gift.toOpen.sort((a: number, b: number) => a - b);
                this.giftDistribution.set(currentPerson, gift);

                opened++
            }
        }

        // pour chaque personne
        let selfAssignedPresent = false
        this.giftDistribution.forEach((value: GiftDistribution, key: string) => {
            // si le nombre à placer n'est pas égal au nombre à ouvrir
            if (value.toPlace.length !== value.toOpen.length) {
                selfAssignedPresent = true
                this.toOpen = []
            }
        });

        if (selfAssignedPresent) {
            // alors on efface les slots à ouvrir pour tout le monde
            this.giftDistribution.forEach((value: GiftDistribution, key: string) => {
                value.toOpen = []
            });
            // et on recommence l'assignation
            this.assignSlotsToOpen()
        }
    }
}

/*     private assignSlotsToOpen() {
        let retries = 0;
        const maxRetries = 10; // Limit retries to prevent infinite loops
    
        while (retries < maxRetries) {
            let selfAssignedPresent = false;
    
            // Attempt to assign gifts
            for (let i = 0; i < this.people.length; i++) {
                const currentPerson = this.people[i];
                let opened = 0;
    
                const slots = Array.from(Array(this.toFill.length).keys());
                const assignedSlot = slots.filter((slot) => this.toFill[slot] != null && this.toFill[slot] !== currentPerson);
    
                if (assignedSlot.length === 0) {
                    break;
                }
    
                let slot: number;
                do {
                    slot = assignedSlot[Math.floor(Math.random() * assignedSlot.length)];
                } while (this.toFill[slot] === currentPerson);  // Ensure no self-assigned gifts
    
                // Assign the gift
                this.toFill[slot] = null;
                this.toOpen[slot] = currentPerson;
    
                const gift = this.giftDistribution.get(currentPerson);
                gift.toOpen.push(slot + 1);
                gift.toOpen.sort((a: number, b: number) => a - b);
                this.giftDistribution.set(currentPerson, gift);
    
                opened++;
            }
    
            // Check for self-assigned presents (gifts that were not properly assigned)
            this.giftDistribution.forEach((value: GiftDistribution, key: string) => {
                if (value.toPlace.length !== value.toOpen.length) {
                    selfAssignedPresent = true;
                    console.log(`${key} has a self-assigned gift`);
                }
            });
    
            if (!selfAssignedPresent) {
                // If no self-assigned presents, break the loop
                break;
            }
    
            retries++; // Increment retry counter
    
            // If max retries reached, break the loop to avoid infinite recursion
            if (retries >= maxRetries) {
                throw new Error('Unable to assign gifts after several retries.');
            }
    
            // Reassign the slots where self-assigned presents were detected
            this.fixSelfAssignedPresents();
        }
    }
    
    private fixSelfAssignedPresents() {
        // Fix the self-assigned presents, only adjusting the problematic assignments
        this.giftDistribution.forEach((value: GiftDistribution, key: string) => {
            value.toOpen = value.toOpen.filter(slot => this.toFill[slot - 1] !== key);
        });
    }
} */