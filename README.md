# Employee Tracker App

## Overview
The Employee Tracker App is a command-line application that allows users to manage departments, roles, and employees in a company database. It provides functionality to view existing data, add new departments, roles, and employees, and update employee roles.

## Demo
- [Employee Tracker Demo](./assets/employeeTracker%20Demo.mov)
- Demo Link: https://github.com/song-richard/employeeTrackerSQL/tree/main/assets

## Features
- View all departments, roles, and employees
- Add a new department
- Add a new role, specifying the title, salary, and department
- Add a new employee, providing information such as first name, last name, role, and manager
- Update an employee's role

## Technologies Used
- JavaScript
- Node.js
- MySQL
- Inquirer.js

## Setup
1. Clone the repository
2. Install dependencies with `npm install`
3. Set up your MySQL database by running the provided schema.sql file
4. Create a `.env` file with your database credentials (DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE)
5. Run the application with `node server.js`

## Usage
Follow the on-screen prompts to interact with the application and perform various actions related to managing departments, roles, and employees.

## Contributors
Richard Song - https://github.com/song-richard

## License
This project is licensed under the MIT License
