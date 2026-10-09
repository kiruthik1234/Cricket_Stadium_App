import { Router } from 'express';
import AuthController from '../controllers/authController';

const router = Router();
const authController = new AuthController();

router.post('/login', authController.login);
router.post('/signin', authController.signIn);

export default function setAuthRoutes(app) {
    app.use('/api/auth', router);
}