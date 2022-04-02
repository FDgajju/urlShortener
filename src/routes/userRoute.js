import { Router } from 'express';
const router = Router();

import { createProfile, logIn } from '../controllers/userController.js';
import { forgetPass, resetPass } from '../controllers/forgetPassword.js';

// endpoint - /user
router.route('/sign-in').post(createProfile);
router.route('/login').post(logIn);

router.post('/forget-Password', forgetPass);
router.put('/forget-Password/reset', resetPass);

export default router;
