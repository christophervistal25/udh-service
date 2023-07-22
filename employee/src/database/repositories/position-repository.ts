import { Model } from "mongoose";
import { IPosition } from "../models/position";
import { Position } from "../models/position";

class PositionRepository {
  private model: Model<IPosition>;

  constructor() {
    this.model = Position;
  }

  async findAll(): Promise<IPosition[]> {
    return this.model.find();
  }

  async findById(id: string): Promise<IPosition | null> {
    return this.model.findById(id);
  }

  async create(position: IPosition): Promise<IPosition> {
    const newPosition: IPosition = new this.model(position);
    return newPosition.save();
  }

  async update(id: string, position: IPosition): Promise<IPosition | null> {
    const existingPosition: IPosition | null = await this.model.findById(id);
    if (existingPosition) {
      existingPosition.name = position.name;
      existingPosition.description = position.description;
      return existingPosition.save();
    } else {
      return null;
    }
  }

  async delete(id: string): Promise<IPosition | null> {
    return this.model.findByIdAndDelete(id);
  }

  static create(): PositionRepository {
    return new PositionRepository();
  }
}

export default PositionRepository;