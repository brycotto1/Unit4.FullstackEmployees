import express from "express";
const employeesRouter = express.Router();
export default employeesRouter;

import { createEmployee, getEmployees, getEmployee, deleteEmployee, updateEmployee} from "../db/queries/employees.js"

//get all employees
employeesRouter.get("/", async (req, res) => {
  const employees = await getEmployees();
  res.status(200).send(employees);
});

//add the employee
employeesRouter.post("/", async (req, res) => {
  const body = req.body;
  if(!body){
    return res.status(400).send("No request body provided");
  }

  if(!body.id || !body.name || !body.birthday || !body.salary){
    return res.status(400).send("A required field is missing");
  }
  
  const newEmployee = createEmployee(req.body);
  res.status(201).send(newEmployee);
})

//get the employee
employeesRouter.get("/:id", async (req, res) => {
  const {id} = req.params;

  if(isNaN(id) || id < 0){
    return res.status(400).send("The employee ID is not a positive integer");
  }

  const employee = getEmployee(id);
  employee ? res.send(employee) : res.status(404);
})

//delete the employee
employeesRouter.delete("/:id", async (req, res) => {
  const {id} = req.params;

  if(isNaN(id) || id < 0){
    return res.status(400).send("The employee ID is not a positive integer");
  }

  const employee = deleteEmployee(id);
  employee ? req.status(204) : res.status(404);
})

//update the employee
employeesRouter.put("/:id", async (req, res) => {
  const body = req.body;
  const {id} = req.params;
  if(!body){
    return res.status(400).send("No request body provided");
  }

  if(!body.id || !body.name || !body.birthday || !body.salary){
    return res.status(400).send("A required field is missing");
  }

  if(isNaN(id) || id < 0){
    return res.status(400).send("The employee ID is not a positive integer");
  }

  const updatedEmployee = updateEmployee(body);
  updatedEmployee ? res.send(updatedEmployee) : res.status(404);
})