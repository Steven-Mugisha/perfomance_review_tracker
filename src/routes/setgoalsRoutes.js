import { Router } from 'express';
import setgoalsController from '../controllers/setgoalsController.js'

const router = Router();

router.post("/goal", setgoalsController.setGoals);

export default router;