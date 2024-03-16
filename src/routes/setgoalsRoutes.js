import { Router } from 'express';
import setgoalsController from '../controllers/setgoalsController.js'

const router = Router();

router.get("/goals/:user_name", setgoalsController.getGoals);
router.post("/goals", setgoalsController.setGoals);
router.post("/goals/notes", setgoalsController.addNotes);
// router.delete("/goals", setgoalsController.deleteGoals);

export default router;