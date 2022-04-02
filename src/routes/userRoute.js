import { Router } from 'express';
const router = Router();

import { createProfile, logIn } from '../controllers/userController.js';

// endpoint - /user
router.route('/sign-in').post(createProfile);
router.route('/login').post(logIn);

export default router;
