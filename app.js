"use strict";

// Function to generate a unique four-digit employee ID
let employeeId = 999;
function generateEmployeeId() {
    employeeId++;
    return employeeId;
}

// Save employees to local storage
function saveEmployeesToLocalStorage(employees) {
    localStorage.setItem('employees', JSON.stringify(employees));
}

// Retrieve employees from local storage
function getEmployeesFromLocalStorage() {
    let storedEmployees = localStorage.getItem('employees');
    return storedEmployees ? JSON.parse(storedEmployees) : [];
}

// Employee constructor
function Employee(fullName, department, level, imageUrl) {
    this.id = generateEmployeeId();
    this.fullName = fullName;
    this.department = department;
    this.level = level;
    this.imageUrl = imageUrl;
    this.salary = this.calculateSalary();
}

// Calculate salary based on the level
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

// Handle form submission
function handleFormSubmit(event) {
    event.preventDefault();

    // Retrieve form values
    let fullName = document.getElementById('fullName').value;
    let department = document.getElementById('department').value;
    let level = document.getElementById('level').value;
    let imageUrl = document.getElementById('imageUrl').value;

    // Create new employee
    let newEmployee = new Employee(fullName, department, level, imageUrl);

    // Get existing employees from local storage
    let employees = getEmployeesFromLocalStorage();

    // Add new employee to the list
    employees.push(newEmployee);

    // Save updated employee list to local storage
    saveEmployeesToLocalStorage(employees);

    // Render new employee card
    newEmployee.renderCard();

    // Clear form fields
    document.getElementById('employeeForm').reset();
}

// Event listener for form submission
document.getElementById('employeeForm').addEventListener('submit', handleFormSubmit);

// Event listener to clear local storage
document.getElementById('clearButton').addEventListener('click', () => {
    localStorage.clear();
    location.reload(); // Reload the page to reflect changes
});

// Render saved employees on page load
document.addEventListener('DOMContentLoaded', () => {
    let employees = getEmployeesFromLocalStorage();
    employees.forEach(employee => {
        let emp = new Employee(employee.fullName, employee.department, employee.level, employee.imageUrl);
        emp.renderCard();
    });
});

// Render employee card
Employee.prototype.renderCard = function() {
    let employeeList = document.getElementById('employeeList');
    let departmentSection = document.getElementById(this.department);

    // If department section doesn't exist, create it
    if (!departmentSection) {
        departmentSection = document.createElement('div');
        departmentSection.id = this.department;
        departmentSection.classList.add('department-section');
        employeeList.appendChild(departmentSection);

        let departmentHeader = document.createElement('h2');
        departmentHeader.textContent = this.department;
        departmentSection.appendChild(departmentHeader);
    }

    let card = document.createElement('div');
    card.classList.add('employee-card');

    card.innerHTML = `
        <img src="${this.imageUrl}" alt="${this.fullName}">
        <p><strong>Name:</strong> ${this.fullName}</p>
        <p><strong>Level:</strong> ${this.level}</p>
        <p><strong>Salary:</strong> $${this.salary}</p>
    `;

    // Append the card to the department section
    departmentSection.appendChild(card);
};
