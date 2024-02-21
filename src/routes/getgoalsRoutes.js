import { Router } from 'express';
import { getGoals } from '../controllers/getgoalsController.js';

const router = Router();

router.get("/:user_id/goals", getGoals);

export default router;
