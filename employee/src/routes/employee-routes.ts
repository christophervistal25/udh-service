import { Router, Request, Response } from "express";
import { ObjectId } from "bson";
import { IEmployee } from "../database/models/employee";
import EmployeeRepository from "../database/repositories/employee-repository";

const router: Router = Router();
const employeeRepository: EmployeeRepository = EmployeeRepository.createRepository();

router.get("/", async (req: Request, res: Response) => {
  try {
    const employees: IEmployee[] = await employeeRepository.findAll();
    res.json(employees);
  } catch (error) {
    res.status(500);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const employee: IEmployee | null = await employeeRepository.findById(req.params.id);
    if (employee) {
      res.json(employee);
    } else {
      res.status(404);
    }
  } catch (error) {
    res.status(500);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const employee: IEmployee = req.body;
    const newEmployee: IEmployee = await employeeRepository.create(employee);
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500);
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const employee: IEmployee = req.body;
    const updatedEmployee: IEmployee | null = await employeeRepository.update(req.params.id, employee);
    if (updatedEmployee) {
      res.json(updatedEmployee);
    } else {
      res.status(404);
    }
  } catch (error) {
    res.status(500);
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deletedEmployee: IEmployee | null = await employeeRepository.delete(req.params.id);
    if (deletedEmployee) {
      res.json(deletedEmployee);
    } else {
      res.status(404);
    }
  } catch (error) {
    res.status(500);
  }
});

export default router;
