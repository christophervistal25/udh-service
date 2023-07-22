import express, { Request, Response } from "express";
import { connection } from "./src/database/index";
import morgan from "morgan";
import employeeRoutes from "./src/routes/employee-routes";
import officeRoutes from "./src/routes/office-routes";
import positionRoutes from './src/routes/position-routes';
const { PORT, SERVICE_NAME } = require("./src/config");
import seedDatabase from "./src/database/seeder/";
const app = express();

seedDatabase();

app.use(morgan("dev"));
app.use(express.json());

app.use("/employees", employeeRoutes);
app.use('/offices', officeRoutes);
app.use('/positions', positionRoutes);

app.listen(PORT, async () => {
  await connection().then(() => console.log("Successfully connected to authentication service database!"));
  console.log(`${SERVICE_NAME} is running on port ${PORT}`);
});
