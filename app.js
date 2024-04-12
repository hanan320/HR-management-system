"use strict";

function Employee(fullName, department, level, imageUrl) {
    this.id = generateEmployeeId();
    this.fullName = fullName;
    this.department = department;
    this.level = level;
    this.imageUrl = imageUrl;
    this.salary = this.calculateSalary();

}

// Function to generate a <---unique---> four-digit employee ID
let employeeId = 999;
function generateEmployeeId() {
   
    employeeId++;

    return employeeId;
}

// Function to generate a <---random---> four-digit employee ID
// function generateEmployeeId() {
//     return Math.floor(1000 + Math.random() * 9000);
// }


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

"use strict";

// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form data
    var fullName = document.getElementById('fullName').value;
    var department = document.getElementById('department').value;
    var level = document.getElementById('level').value;
    var imageUrl = document.getElementById('imageUrl').value;

    // Create new Employee object
    var newEmployee = new Employee(fullName, department, level, imageUrl);

    // Render the new employee card
    newEmployee.renderCard();

    // Clear form fields
    document.getElementById('fullName').value = '';
    document.getElementById('department').value = '';
    document.getElementById('level').value = '';
    document.getElementById('imageUrl').value = '';
}

// Add event listener to the form for form submission
document.getElementById('employeeForm').addEventListener('submit', handleFormSubmit);

// Function to render the employee card
Employee.prototype.renderCard = function() {
    var employeeList = document.getElementById('employeeList');
    var departmentSection = document.getElementById(this.department);

    // If department section doesn't exist, create it
    if (!departmentSection) {
        departmentSection = document.createElement('div');
        departmentSection.id = this.department;
        departmentSection.classList.add('department-section');
        employeeList.appendChild(departmentSection);

        // Create department header
        var departmentHeader = document.createElement('h2');
        departmentHeader.textContent = this.department;
        departmentSection.appendChild(departmentHeader);
    }

    // Create employee card
    var card = document.createElement('div');
    card.classList.add('employee-card');
    
    // Add employee information to the card
    card.innerHTML = `
        <img src="${this.imageUrl}" alt="${this.fullName}">
        <p><strong>Name:</strong> ${this.fullName}</p>
        <p><strong>Level:</strong> ${this.level}</p>
        <p><strong>Salary:</strong> $${this.salary}</p>
    `;

    // Append the card to the department section
    departmentSection.appendChild(card);
};



// Creating instances of Employee
// const employees = [
//     new Employee(1000, 'Ghazi Samer', 'Administration', 'Senior'),
//     new Employee(1001, 'Lana Ali', 'Finance', 'Senior'),
//     new Employee(1002, 'Tamara Ayoub', 'Marketing', 'Senior'),
//     new Employee(1003, 'Safi Walid', 'Administration', 'Mid-Senior'),
//     new Employee(1004, 'Omar Zaid', 'Development', 'Senior'),
//     new Employee(1005, 'Rana Saleh', 'Development', 'Junior'),
//     new Employee(1006, 'Hadi Ahmad', 'Finance', 'Mid-Senior')
// ];

// Prototype function to render each employee's name and salary in the home page
// Employee.prototype.render = function () {
//     return `${this.employeeID} , ${this.fullName} , ${this.department} , ${this.level} , ${this.salary};`;
// };

// Render employee information in the home page
// const employeeInfoContainer = document.getElementById('employee-info');
// employees.forEach(employee => {
//     const employeeInfo = document.createElement('p');
//     employeeInfo.textContent = employee.render();
//     employeeInfoContainer.appendChild(employeeInfo);
// });
