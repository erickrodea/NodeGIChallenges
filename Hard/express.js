const express = require('express');
const fs = require('fs');

const app = express();// Creates an Express application
const port = 8000;

app.use(express.json());//Adds middleware to parse incoming JSON requests. This line enables the server to understand JSON data in requests.

// get data from json file
const getData = () => {
    try {
        const dataBuffer = fs.readFileSync('employees.json'); // Read data from the file
        const dataJSON = dataBuffer.toString(); // Convert data buffer to string
        return JSON.parse(dataJSON); // Parse JSON string to get the notes array
    } catch (e) {
        return "employee not found"; // Return an empty array if there's an error (e.g., file not found)
    }
}

// Default route to handle requests to the root URL
app.get('/', (req, res) => {
    res.send('<Strong> Welcome to the Employee API.</Strong> <br>USe This to find an employee by name http://localhost:8000/employees/name/First name%20last name <br>Use /employees to get All employee data.<br>use to find a specific employee by their ID http://localhost:8000/employees/id/ID NUMBER. <br> use to find employees in a specific department http://localhost:8000/employees/department/ENTER Department Name.<br> use to find employees with the same salaries http://localhost:8000/employees/department/ENTER SALARY ');// What user will see upon server going live

});


// Endpoint to get all employees 
app.get('/employees', (req, res) => {
    const employees = getData();
    res.json(employees)//this is the forward slash we're putting after local host

});
//Get em ployee by name
app.get('/employees/name/:name', (req, res) => {
    const employees = getData();
    const employeeName = req.params.name; //  should use req.params.id since you specified :id in the route definition.
    const employee = employees.find(emp => emp.name === employeeName);//checks if the employeeID property of the current employee (emp.employeeID) is equal to the specified employeeID obtained from the request parameters.

    if (employee) {
        res.json(employee); // Send JSON response if employee is found
        ///http://localhost:8000/employees/id/ID NUMBER  

    } else {
        res.status(404).send("Employee not found");
    }
});

//employee by id
app.get('/employees/id/:id', (req, res) => {
    const employees = getData();
    const employeeID = parseInt(req.params.id); //  should use req.params.id since you specified :id in the route definition.
    const employee = employees.find(emp => emp.employeeID === employeeID);//checks if the employeeID property of the current employee (emp.employeeID) is equal to the specified employeeID obtained from the request parameters.

    if (employee) {
        res.json(employee); // Send JSON response if employee is found
        ///http://localhost:8000/employees/id/ID NUMBER  

    } else {
        res.status(404).send("Employee not found");
    }
});

//employee by department
//http://localhost:8000/employees/department/ENTER Department Name
app.get('/employees/department/:dep', (req, res) => {
    const employees = getData();//read the file
    const employeeDept = req.params.dep;
    const department = employees.filter(dep => dep.department === employeeDept);
    if (department.length > 0) {
        res.json(department);
    } else {
        res.status(404).send('Noone is in that department')
    }
});

//employee by salary
app.get('/employees/salary/:salary', (req, res) => {
    const employees = getData();
    const employeeSalary = parseInt(req.params.salary);
    const salary = employees.filter(emp => emp.salary === employeeSalary);
    if (salary.length > 0) {
        res.json(salary);
    } else {
        res.status("noone with that salary exists")
    }
});




// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);//terminal output with link to server
});

