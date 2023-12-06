const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.json());

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
        } else {
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
