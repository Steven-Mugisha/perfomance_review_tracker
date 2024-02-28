import { Router } from 'express';
import setgoalsController from '../controllers/setgoalsController.js'

const router = Router();

router.post("/goal", setgoalsController.setGoals);
router.post("/goal/notes", setgoalsController.addNotes);

export default router;