import { Router } from 'express';
import setgoalsController from '../controllers/setgoalsController.js'

const router = Router();

router.get("/", setgoalsController.getAllGoals);

router.post("/api/setgoal", setgoalsController.setGoals);

export default router;