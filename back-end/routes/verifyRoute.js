import { Router } from 'express';
const router = Router();

import verifyUser from '../controllers/verifyMail.js';

router.put('/:userId', verifyUser);

export default router;
