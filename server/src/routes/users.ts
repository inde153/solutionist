import express from 'express';
import signup from '../controllers/users/signup';
import login from '../controllers/users/login';
import checktoken from '../middleware/checkauth';
import signout from '../controllers/users/signout';

const userRouter = express.Router();
userRouter.delete('/signout', checktoken, signout);
userRouter.post('/signup', signup);
userRouter.post('/login', login);

export default userRouter;
