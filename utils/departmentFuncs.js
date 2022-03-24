const db = require('../db/connection');
const inquirer = require('inquirer');
const table = require('console.table');


module.exports = {
    viewAllDepartments,
    addNewDepartment,
    deleteDepartment
};