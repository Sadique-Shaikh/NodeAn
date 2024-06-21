import express from 'express';
import { getDetails, login, register } from '../controller/authController.js';
import upload from '../utils/authMiddleWare.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/register', upload.single('image'), register);

router.post('/login', login);

router.get('/user',verifyToken, getDetails);

export default router;
