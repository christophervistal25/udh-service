import { connection } from "../../database/index";
import { IPosition, Position } from "../models/position";
import { IOffice, Office } from "../models/office";
import { IEmployee, Employee } from "../models/employee";
import { faker } from "@faker-js/faker";

const seedData = async () => {
  await connection().then(async () => {
    console.log("Seeding data for employee...");
    // Seed positions
    const positions: IPosition[] = [];
    for (let i = 0; i < 10; i++) {
      const position: IPosition = new Position({
        name: faker.word.adjective(),
        description: faker.lorem.sentence(),
      });
      positions.push(position);
    }
    await Position.insertMany(positions);

    // Seed offices
    const offices: IOffice[] = [];
    for (let i = 0; i < 5; i++) {
      const office: IOffice = new Office({
        name: faker.company.buzzPhrase(),
        description: faker.company.buzzPhrase(),
        location: JSON.stringify(faker.location.nearbyGPSCoordinate()),
        telephoneNumber: faker.phone.number("501-###-###"),
        phoneNumber: faker.phone.number(),
        email: faker.internet.email(),
      });
      offices.push(office);
    }
    await Office.insertMany(offices);

    // Seed employees
    const employees: IEmployee[] = [];
    for (let i = 0; i < 10; i++) {
      const employee: IEmployee = new Employee({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        position: positions[Math.floor(Math.random() * positions.length)]._id,
        office: offices[Math.floor(Math.random() * offices.length)]._id,
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
        phoneNumber: faker.phone.number(),
        address: faker.location.streetAddress({ useFullAddress: true }),
        workStatus: faker.helpers.arrayElement(["full-time", "part-time"]),
        activeStatus: faker.datatype.boolean(0.5),
      });

      employees.push(employee);
    }
    await Employee.insertMany(employees);

    console.log("Data seeded successfully");
  });
};

export default seedData;
