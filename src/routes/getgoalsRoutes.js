import { Router } from 'express';
import getAllGoalsController from '../controllers/getgoalsController.js';

const router = Router();

router.get("/:user_id/goals", getAllGoalsController.getGoals);

export default router;
