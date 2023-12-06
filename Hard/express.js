const express = require('express');
const fs = require('fs');

const app = express();// Creates an Express application
const port = 4000;

app.use(express.json());//Adds middleware to parse incoming JSON requests. This line enables the server to understand JSON data in requests.

// Endpoint to get all employees or a specific employee by ID or name
app.get('/employees', (req, res) => {
    // Read the content of the 'employees.json' file asynchronously
    fs.readFile('employees.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        // Parse the JSON data from the file
        const employees = JSON.parse(data);

        // Check if query parameters are present
        if (req.query.id) {
            // If 'id' parameter is present, filter employees by ID
            const employeeID = parseInt(req.query.id);

            // Find the employee with the specified ID
            const employee = employees.find((emp) => emp.employeeID === employeeID);

            if (employee) {
                res.json(employee); // Send the found employee as the response
            } else {
                res.status(404).send('Employee not found'); // Send 404 status if employee not found
            }
        } else if (req.query.name) {
            // If 'name' parameter is present, filter employees by name
            const employeeName = req.query.name;

            // Find the employee with the specified name
            const employee = employees.find((emp) => emp.name === employeeName);

            if (employee) {
                res.json(employee); // Send the found employee as the response
            } else {
                res.status(404).send('Employee not found'); // Send 404 status if employee not found
            }
        }
        else if (req.query.department) {
            // If 'department' parameter is present, filter employees by department
            const employeeDept = req.query.department;

            // Find all employees with the specified department
            const employeesInDept = employees.filter((emp) => emp.department === employeeDept);

            if (employeesInDept.length > 0) {
                res.json(employeesInDept); // Send the found employees as the response
            } else {
                res.status(404).send('No employees found in the specified department'); // Send 404 status if no employees found
            }
        } else if (req.query.salary) {
            // If 'salary' parameter is present, filter employees by salary just like in the Id one since its a number use ParseInt
            const employeeSalary = parseInt(req.query.salary);

            // Find all employees with the specified salary
            const employeesInSalary = employees.filter((emp) => emp.salary === employeeSalary);

            if (employeesInSalary.length > 0) {
                res.json(employeesInSalary); // Send the found employees as the response
            } else {
                res.status(404).send('No employees found with the specified salary'); // Send 404 status if no employees found
            }
        }




        else {
            // If no query parameters, send all employees as the response
            res.json(employees);
        }
    });
});

// Default route to handle requests to the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Employee API. Use /employees to get employee data.');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// http://localhost:3000/employees?id=2
// http://localhost:4000/employees?name=John%20Doe
//http://localhost:4000/employees?department=HR 
//http://localhost:4000/employees?salary=70000
