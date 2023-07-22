import { Document, Schema, Model, model } from "mongoose";

interface IOffice extends Document {
  name: string;
  description: string;
  location: string;
  telephoneNumber: string;
  phoneNumber: string;
  email: string;
}

const OfficeSchema: Schema<IOffice> = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  telephoneNumber: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

const Office: Model<IOffice> = model<IOffice>("Office", OfficeSchema);

export { Office, IOffice };