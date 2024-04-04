"use strict";

// Constructor function to generate an employee object
function Employee(employeeID, fullName, department, level) {
    this.employeeID = employeeID;
    this.fullName = fullName;
    this.department = department;
    this.level = level;
    this.salary = this.calculateSalary();
}

// Prototype function to calculate salary
Employee.prototype.calculateSalary = function () {
    let min, max;
    switch (this.level) {
        case 'Senior':
            min = 1500;
            max = 2000;
            break;
        case 'Mid-Senior':
            min = 1000;
            max = 1500;
            break;
        case 'Junior':
            min = 500;
            max = 1000;
            break;
        default:
            min = 0;
            max = 0;
            break;
    }
    let randomSalary = Math.floor(Math.random() * (max - min + 1)) + min;
    let netSalary = randomSalary * (1 - 0.075); // 7.5% tax

    return netSalary.toFixed(2);
};


// Creating instances of Employee
const employees = [
    new Employee(1000, 'Ghazi Samer', 'Administration', 'Senior'),
    new Employee(1001, 'Lana Ali', 'Finance', 'Senior'),
    new Employee(1002, 'Tamara Ayoub', 'Marketing', 'Senior'),
    new Employee(1003, 'Safi Walid', 'Administration', 'Mid-Senior'),
    new Employee(1004, 'Omar Zaid', 'Development', 'Senior'),
    new Employee(1005, 'Rana Saleh', 'Development', 'Junior'),
    new Employee(1006, 'Hadi Ahmad', 'Finance', 'Mid-Senior')
];

// Prototype function to render each employee's name and salary in the home page
Employee.prototype.render = function () {
    return `${this.employeeID} , ${this.fullName} , ${this.department} , ${this.level} , ${this.salary};`;
};

// Render employee information in the home page
const employeeInfoContainer = document.getElementById('employee-info');
employees.forEach(employee => {
    const employeeInfo = document.createElement('p');
    employeeInfo.textContent = employee.render();
    employeeInfoContainer.appendChild(employeeInfo);
});
