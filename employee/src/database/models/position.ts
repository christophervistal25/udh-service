import { Document, Schema, Model, model } from "mongoose";

interface IPosition extends Document {
  name: string;
  description: string;
}

const PositionSchema: Schema<IPosition> = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const Position: Model<IPosition> = model<IPosition>("Position", PositionSchema);

export { Position, IPosition };