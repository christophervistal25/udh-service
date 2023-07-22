import { Router, Request, Response } from "express";
import { IPosition } from "../database/models/position";
import PositionRepository from "../database/repositories/position-repository";

const router: Router = Router();

const positionRepository: PositionRepository = PositionRepository.create();

router.get("/", async (req: Request, res: Response) => {
  try {
    const positions: IPosition[] = await positionRepository.findAll();
    res.json(positions);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const position: IPosition | null = await positionRepository.findById(req.params.id);
    if (position) {
      res.json(position);
    } else {
      res.status(404).json({ error: "Position not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const position: IPosition = req.body;
    const newPosition: IPosition = await positionRepository.create(position);
    res.status(201).json(newPosition);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const position: IPosition = req.body;
    const updatedPosition: IPosition | null = await positionRepository.update(req.params.id, position);
    if (updatedPosition) {
      res.json(updatedPosition);
    } else {
      res.status(404).json({ error: "Position not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deletedPosition: IPosition | null = await positionRepository.delete(req.params.id);
    if (deletedPosition) {
      res.json(deletedPosition);
    } else {
      res.status(404).json({ error: "Position not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
