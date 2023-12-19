const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

async function connectToDatabase() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
        });

        console.log("Connected to database!");

        return connection;
    } catch (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    };
};

//View Departments
async function viewDepartments(connection) {
    try {
        const [rows] = await connection.execute('SELECT * FROM department');
        console.table(rows);
    } catch (err) {
        console.error('Error viewing departments:', err);
    }
};

//View Roles
async function viewRoles(connection) {
    try {
        const [rows] = await connection.execute('SELECT * FROM role');
        console.table(rows);
    } catch (err) {
        console.error('Error viewing roles:', err);
    };
};

//View Employees
async function viewEmployees(connection) {
    try {
        const [rows] = await connection.execute('SELECT * FROM employee');
        console.table(rows);
    } catch (err) {
        console.error('Error viewing employees:', err);
    };
};

//Add Department
async function addDepartment(connection) {
    const departmentQuestions = [
        {
            type: 'input',
            name: 'name',
            message: 'Enter department name:',
        },
    ];

    const departmentData = await inquirer.prompt(departmentQuestions);

    try {
        await connection.execute('INSERT INTO department (name) VALUES (?)', [departmentData.name]);
        console.log("Department added successfully!");
    } catch (err) {
        console.error('Error adding department:', err);
    }
};

//Add Role
async function addRole(connection) {
    const roleQuestions = [
        {
            type: 'input',
            name: 'title',
            message: 'Enter role title:',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter role salary:',
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'Enter department ID for this role:',
        },
    ];

    const roleData = await inquirer.prompt(roleQuestions);

    try {
        await connection.execute('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [
            roleData.title,
            roleData.salary,
            roleData.department_id,
        ]);
        console.log("Role added successfully!");
    } catch (err) {
        console.error('Error adding role:', err);
    }
};

//Main Menu
async function mainMenu() {
    const connection = await connectToDatabase();

    const choices = [
        'View All Departments',
        'View All Roles',
        'View All Employees',
        'Add a Department',
        'Add a Role',
    ];

    const { option } = await inquirer.prompt({
        type: 'list',
        name: 'option',
        message: 'Select an option:',
        choices: choices,
    });

    switch (option) {
        case 'View All Departments':
            await viewDepartments(connection);
            break;
        case 'View All Roles':
            await viewRoles(connection);
            break;
        case 'View All Employees':
            await viewEmployees(connection);
            break;
        case 'Add a Department':
            await addDepartment(connection);
            break;
        case 'Add a Role':
            await addRole(connection);
            break;
    };

};

mainMenu();