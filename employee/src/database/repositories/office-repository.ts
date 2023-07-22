import { Model } from "mongoose";
import { Office, IOffice } from "../models/office";

class OfficeRepository {
  private model: Model<IOffice>;

  constructor() {
    this.model = Office;
  }

  async findAll(): Promise<IOffice[]> {
    return this.model.find();
  }

  async findById(id: string): Promise<IOffice | null> {
    return this.model.findById(id);
  }

  async create(office: IOffice): Promise<IOffice> {
    const newOffice: IOffice = new this.model(office);
    return newOffice.save();
  }

  async update(id: string, office: IOffice): Promise<IOffice | null> {
    const existingOffice: IOffice | null = await this.model.findById(id);
    if (existingOffice) {
      existingOffice.name = office.name;
      existingOffice.location = office.location;
      return existingOffice.save();
    } else {
      return null;
    }
  }

  async delete(id: string): Promise<IOffice | null> {
    return this.model.findByIdAndDelete(id);
  }

  static create(): OfficeRepository {
    return new OfficeRepository();
  }
}

export default OfficeRepository;
