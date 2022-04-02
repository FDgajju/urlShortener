import express from 'express';
const router = express.Router();

import { createUrl, getUrl } from '../controllers/urlController.js';
import auth from '../middleware/auth.js';

router.post('/url/shorten/:userId', auth, createUrl);
router.get('/:urlCode', getUrl);

export default router;
