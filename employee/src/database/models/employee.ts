import { Document, Schema, Model, model } from "mongoose";
import { IOffice } from "./office";
import { IPosition } from "./position";


interface IEmployee extends Document {
  firstName: string;
  middleName: string | null;
  lastName: string;
  suffix: string | null;
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
  office: IOffice["_id"];
  address: string;
  position: IPosition["_id"];
  workStatus: string;
  activeStatus: boolean;
}

const EmployeeSchema: Schema<IEmployee> = new Schema({
  firstName: { type: String, required: true },
  middleName: { type: String, default: null },
  lastName: { type: String, required: true },
  suffix: { type: String, default: null },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  office: { type: Schema.Types.ObjectId, ref: "Office", required: true },
  address: { type: String, required: true },
  position: { type: Schema.Types.ObjectId, ref: "Position", required: true },
  workStatus: { type: String, required: true },
  activeStatus: { type: Boolean, required: true, default: true },
});

const Employee: Model<IEmployee> = model<IEmployee>("Employee", EmployeeSchema);

export { Employee, IEmployee };
