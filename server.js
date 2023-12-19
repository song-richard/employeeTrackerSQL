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

        //Seed 'department' table
        const departmentQuestions = [
            {
                type: 'input',
                name: 'name',
                message: 'Enter departnment name',
            },
        ];
        const departmentData = await inquirer.prompt(departmentQuestions);
        await connection.execute('INSERT INTO department (name) VALUES (?)', [departmentData.name]);
        console.log('Department data inserted successfully.');

//----------------------------------------//
        //Seed 'role' table
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
                message: 'Enter department ID for this role:'
            },
        ];

        const roleData = await inquirer.prompt(roleQuestions);
        await connection.execute('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [
            roleData.title,
            roleData.salary,
            roleData.department_id,
        ]);
        console.log("Role data inserted successfully");

//----------------------------------------//
        //Seed 'employee' table
        const employeeQuestions = [
            {
                type: 'input',
                name: 'first_name',
                message: 'Enter employee first name:'
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'Enter employee last name:'
            },
            {
                type: 'input',
                name: 'role_id',
                message: 'Enter role ID for the employee:'
            },
            {
                type: 'input',
                name: 'manager_id',
                message: 'Enter manager ID for the employee'
            },
        ];

        const employeeData = await inquirer.prompt(employeeQuestions);
        await connection.execute('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [
            employeeData.first_name,
            employeeData.last_name,
            employeeData.role_id,
            employeeData.manager_id,
        ]);
        console.log("Employee data inserted successfully");

        await connection.end();
    } catch (err) {
        console.error('Error connecting to the database:' ,err);
    };
};

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

connectToDatabase();