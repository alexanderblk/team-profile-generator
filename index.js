const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require('inquirer');
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


const teamMembers = [];

// Questions for each employee role
const managerQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the manager's name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is the manager's ID?"
    },
    {
        type: "input",
        name: "email",
        message: "What is the manager's email?"
    },
    {
        type: "input",
        name: "officeNumber",
        message: "What is the manager's office number?"
    }
];

const engineerQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the engineer's name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is the engineer's ID?"
    },
    {
        type: "input",
        name: "email",
        message: "What is the engineer's email?"
    },
    {
        type: "input",
        name: "github",
        message: "What is the engineer's GitHub username?"
    }
];

const internQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the intern's name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is the intern's ID?"
    },
    {
        type: "input",
        name: "email",
        message: "What is the intern's email?"
    },
    {
        type: "input",
        name: "school",
        message: "What is the intern's school?"
    }
];

const roleQuestion = [
    {
        type: "list",
        name: "role",
        message: "What is the employee's role?",
        choices: ["Manager", "Engineer", "Intern", "No more employees"]
    }
];

async function init() {
    console.log("Please build your team.");

    let addEmployee = true;
    while (addEmployee) {
        const roleAnswer = await inquirer.prompt(roleQuestion);
        switch (roleAnswer.role) {
            case "Manager":
                employees.push(await inquirer.prompt(managerQuestions));
                break;
            case "Engineer":
                employees.push(await inquirer.prompt(engineerQuestions));
                break;
            case "Intern":
                employees.push(await inquirer.prompt(internQuestions));
                break;
            default:
                addEmployee = false;
                break;
        }
    }

    const employeeObjects = employees.map(employee => {
        switch (employee.role) {
            case "Manager":
                return new Manager(employee.name, employee.id, employee.email, employee.officeNumber);
            case "Engineer":
                return new Engineer(employee.name, employee.id, employee.email, employee.github);
            case "Intern":
                return new Intern(employee.name, employee.id, employee.email, employee.school);
            default:
                break;
        }
    });

    const html = render(employeeObjects);

    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath, html);
}

init();
