import { Router } from 'express';
import { SheetsController } from '../controllers/SheetsController';

const router = Router();
const mySheetsController = new SheetsController();

router.post('/sheetRows', mySheetsController.create);
router.get('/sheetRows', mySheetsController.read);

export default router;