import { Router } from 'express';
const router = Router();

import redirectUrl from '../controllers/redirect.js';

router.get('/:urlCode', redirectUrl);

export default router;
