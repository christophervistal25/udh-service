import { Model } from "mongoose";
import { Employee, IEmployee } from "../models/employee";

class EmployeeRepository {
  private model: Model<IEmployee>;

  constructor() {
    this.model = Employee;
  }

  async findAll(): Promise<IEmployee[]> {
    return this.model.find();
  }

  async findById(id: string): Promise<IEmployee | null> {
    return this.model.findById(id);
  }

  async create(employee: IEmployee): Promise<IEmployee> {
    const newEmployee: IEmployee = new this.model(employee);
    return newEmployee.save();
  }

  async update(id: string, employee: IEmployee): Promise<IEmployee | null> {
    const existingEmployee: IEmployee | null = await this.model.findById(id);
    if (existingEmployee) {
      existingEmployee.firstName = employee.firstName;
      existingEmployee.middleName = employee.middleName;
      existingEmployee.lastName = employee.lastName;
      existingEmployee.suffix = employee.suffix;
      existingEmployee.username = employee.username;
      existingEmployee.email = employee.email;
      existingEmployee.password = employee.password;
      existingEmployee.phoneNumber = employee.phoneNumber;
      existingEmployee.office = employee.office;
      existingEmployee.address = employee.address;
      existingEmployee.position = employee.position;
      existingEmployee.workStatus = employee.workStatus;
      existingEmployee.activeStatus = employee.activeStatus;
      return existingEmployee.save();
    } else {
      return null;
    }
  }

  async delete(id: string): Promise<IEmployee | null> {
    return this.model.findByIdAndDelete(id);
  }

  static createRepository(): EmployeeRepository {
    return new EmployeeRepository();
  }
}

export default EmployeeRepository;