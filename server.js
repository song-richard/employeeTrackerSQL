const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

async function seedDatabase() {
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
        await connection.execute('INSERT INTO employee (first_name, last_name, role_id, manager_id VALUES (?, ?, ?, ?', [
            employeeData.first_name,
            employeeData.last_name,
            employeeData.role_id,
            employeeData.manager_id,
        ]);

    } catch (err) {
        console.error('Error connecting to the database:' ,err);
    };
};

seedDatabase();