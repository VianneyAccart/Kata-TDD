type Employee = {
    name: string,
    age: number
}

export default class EmployeeReport {
    constructor(private employees: Employee[]){}

    canWorkOnSundays() {
        return this.employees.filter((e: Employee) => {
            return e.age >= 18
        })
    }

    sortByName(order: "asc" | "desc") {
        return this.employees.sort((a: Employee, b: Employee) => {
            return order === "desc" ? 
                b.name.localeCompare(a.name) : 
                a.name.localeCompare(b.name)
        }) 
    }

    capitalizeName() {
        return this.employees.map((e: Employee) => {
            e.name = e.name.toUpperCase()
            return e
        })
    }
}