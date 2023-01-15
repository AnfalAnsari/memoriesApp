import Express from 'express';
import { signIn, signUp } from '../controllers/user.js'
const router = Express.Router();

router.post('/signin', signIn);
router.post('/signup', signUp);

export default router;