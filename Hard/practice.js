// const express = require('express');
// const fs = require('fs');

// const app = express();// Creates an Express application
// const port = 8000;

// app.use(express.json());//Adds middleware to parse incoming JSON requests. This line enables the server to understand JSON data in requests.

// // get data from json file
// const getData = () => {
//     try {
//         const dataBuffer = fs.readFileSync('employees.json'); // Read data from the file
//         const dataJSON = dataBuffer.toString(); // Convert data buffer to string
//         return JSON.parse(dataJSON); // Parse JSON string to get the notes array
//     } catch (e) {
//         return "employee not found"; // Return an empty array if there's an error (e.g., file not found)
//     }
// }

// // Default route to handle requests to the root URL
// app.get('/', (req, res) => {
//     res.send('<Strong> Welcome to the Employee API.</Strong> <br>Use /employees to get All employee data.<br>use to find a specific employee by their ID http://localhost:8000/employees/id/ID NUMBER. <br> use to find employees in a specific department http://localhost:8000/employees/department/ENTER Department Name.<br> use to find employees with the same salaries http://localhost:8000/employees/department/ENTER SALARY ');// What user will see upon server going live

// });


// http://localhost:3000/employees?id=2
// http://localhost:4000/employees?name=John%20Doe
//http://localhost:4000/employees?department=HR 
//http://localhost:4000/employees?salary=70000

/*
http://localhost:4000/employees?id=2: This query fetches an employee by their ID, specifically the employee with ID 2.

http://localhost:4000/employees?name=John%20Doe: This query fetches an employee by their name, specifically the employee with the name "John Doe." Note that spaces in the name are URL-encoded as "%20."

http://localhost:4000/employees?department=HR: This query fetches all employees in a specific department, specifically the department with the name "HR."

http://localhost:4000/employees?salary=70000: This query fetches all employees with a specific salary, specifically employees with a salary of 70000.

Each query parameter (id, name, department, and salary) is used to filter the list of employees based on the specified criteria.



In Express.js, req.query is an object containing the parsed query parameters from the URL. 
When a client makes an HTTP request to a server with query parameters, Express parses these parameters and makes them available 
in the req.query object.

For example, given the URL: http://localhost:4000/employees?name=John%20Doe&department=HR, req.query will be:


const employeeName = req.query.name;
const employeeDept = req.query.department;
const employeeSalary = req.query.salary;

These lines extract the values of the name, department, and salary query parameters from the req.query object.
This allows the server to use these values to filter and retrieve specific data based on the client's request.

app.get('/employees', (req, res) => { //this is the forward slash we're putting after local host
    // Read the content of the 'employees.json' file asynchronously
    fs.readFile('employees.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');// Handles errors during file reading. Sends a 500 status response and an error message if there's an issue reading the file.
            return;
        }

        //Parses the JSON data from the file into an array of employee objects.
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
    res.send('Welcome to the Employee API. Use /employees to get employee data.');// What user will see upon server going live
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);//terminal output with link to server
});


*/