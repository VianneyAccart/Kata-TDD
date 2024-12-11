import EmployeeReport from "./employee-report";

describe("Employee report", () => {
    let employeeReport: EmployeeReport;

    beforeEach(() => {
        employeeReport = new EmployeeReport([
            { name: 'Max', age: 17 },
            { name: 'Sepp', age: 18 },
            { name: 'Nina', age: 15 },
            { name: 'Mike', age: 51 },
          ]);
    })

    it("Should list the employees who can work on Sundays", () => {
        const sundayEmployees = employeeReport.canWorkOnSundays();
        const expectedSundayEmployees = [
            { name: 'Sepp', age: 18 },
            { name: 'Mike', age: 51 },
          ]
        expect(sundayEmployees).toStrictEqual(expectedSundayEmployees)
    })

    it("Should sort employees by their name in the ascending order", () => {
        const sortedEmployees = employeeReport.sortByName("asc");
        const expectedSortedEmployees = [ 
            { name: 'Max', age: 17 },
            { name: 'Mike', age: 51 },
            { name: 'Nina', age: 15 },
            { name: 'Sepp', age: 18 },
          ]
        expect(sortedEmployees).toStrictEqual(expectedSortedEmployees)
    })

    it("Should capitalize employee names", () => {
        const capitalizedEmployees = employeeReport.capitalizeName();
        const expectedCapitalizedEmployees= [
            { name: 'MAX', age: 17 },
            { name: 'SEPP', age: 18 },
            { name: 'NINA', age: 15 },
            { name: 'MIKE', age: 51 },
          ]
        expect(capitalizedEmployees).toStrictEqual(expectedCapitalizedEmployees)
    })

    it("Should sort employees by their name in the descending order", () => {
        const sortedEmployees = employeeReport.sortByName("desc");
        const expectedSortedEmployees = [
            { name: 'Sepp', age: 18 },
            { name: 'Nina', age: 15 },
            { name: 'Mike', age: 51 },
            { name: 'Max', age: 17 }
          ]
        expect(sortedEmployees).toStrictEqual(expectedSortedEmployees)
    })
})