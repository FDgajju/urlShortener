import express from 'express';
const router = express.Router();

import { createUrl } from '../controllers/urlController.js';
import auth from '../middleware/auth.js';

router.post('/url/shorten/:userId', auth, createUrl);

export default router;
