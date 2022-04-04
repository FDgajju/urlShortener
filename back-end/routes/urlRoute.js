import express from 'express';
const router = express.Router();

import { createUrl, getAllShortUrls } from '../controllers/urlController.js';
import auth from '../middleware/auth.js';

router.post('/url/shorten/:userId', auth, createUrl);
router.get('/shortUrls/user/:userId', auth, getAllShortUrls);

export default router;
