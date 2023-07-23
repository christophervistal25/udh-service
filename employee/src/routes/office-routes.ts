import { Router, Request, Response } from "express";
import { IOffice } from "../database/models/office";
import OfficeRepository from "../database/repositories/office-repository";

const router: Router = Router();
const officeRepository: OfficeRepository = OfficeRepository.create();

router.get("/", async (req: Request, res: Response) => {
  try {
    const offices: IOffice[] = await officeRepository.findAll();
    res.json(offices);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const office: IOffice | null = await officeRepository.findById(req.params.id);
    if (office) {
      res.json(office);
    } else {
      res.status(404).json({ error: "Office not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const office: IOffice = req.body;
    const newOffice: IOffice = await officeRepository.store(office);
    res.status(201).json(newOffice);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const office: IOffice = req.body;
    console.log(req.body);
    const updatedOffice: IOffice | null = await officeRepository.update(req.params.id, office);
    if (updatedOffice) {
      res.json(updatedOffice);
    } else {
      res.status(404).json({ error: "Office not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deletedOffice: IOffice | null = await officeRepository.delete(req.params.id);
    if (deletedOffice) {
      res.json(deletedOffice);
    } else {
      res.status(404).json({ error: "Office not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;