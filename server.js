const inquirer = require('inquirer');
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();


async function seedDatabase() {
    try {
        await mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            // database: process.env.DB_DATABASE,
        })
        console.log("Connected to database!")

        const departmentQuestions = [
            {
                type: 'input',
                name: 'name',
                message: 'Enter departnment name',
            },
        ];
        const departmentData = await inquirer.createPromptModule(departmentQuestions);

    } catch (err) {
        console.error('Error connecting to the database:' ,err)
    };
};

seedDatabase();