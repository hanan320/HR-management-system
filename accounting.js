"use strict";

// Retrieve employees from local storage
function getEmployeesFromLocalStorage() {
    let storedEmployees = localStorage.getItem('employees');
    return storedEmployees ? JSON.parse(storedEmployees) : [];
}

// Calculate department statistics
function calculateDepartmentStatistics() {
    let employees = getEmployeesFromLocalStorage();
    let departmentStats = {};

    employees.forEach(employee => {
        if (!departmentStats[employee.department]) {
            departmentStats[employee.department] = {
                employeeCount: 0,
                totalSalary: 0
            };
        }

        departmentStats[employee.department].employeeCount++;
        departmentStats[employee.department].totalSalary += parseFloat(employee.salary);
    });

    return departmentStats;
}

// Render accounting table
function renderAccountingTable() {
    let departmentStats = calculateDepartmentStatistics();
    let accountingTable = document.getElementById('accountingTable');
    let totalEmployees = 0;
    let totalSalary = 0;

    // Clear existing table rows
    accountingTable.querySelector('tbody').innerHTML = '';
    accountingTable.querySelector('tfoot').innerHTML = '';

    // Populate table rows
    for (let department in departmentStats) {
        let averageSalary = departmentStats[department].totalSalary / departmentStats[department].employeeCount;

        totalEmployees += departmentStats[department].employeeCount;
        totalSalary += departmentStats[department].totalSalary;

        let row = `
            <tr>
                <td>${department}</td>
                <td>${departmentStats[department].employeeCount}</td>
                <td>$${departmentStats[department].totalSalary.toFixed(2)}</td>
                <td>$${averageSalary.toFixed(2)}</td>
            </tr>
        `;

        accountingTable.querySelector('tbody').innerHTML += row;
    }

    // Add table footer
    let footerRow = `
        <tr>
            <td>Total</td>
            <td>${totalEmployees}</td>
            <td>$${totalSalary.toFixed(2)}</td>
            <td>$${(totalSalary / totalEmployees).toFixed(2)}</td>
        </tr>
    `;

    accountingTable.querySelector('tfoot').innerHTML += footerRow;
}

// Render accounting table on page load
document.addEventListener('DOMContentLoaded', renderAccountingTable);
