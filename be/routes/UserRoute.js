import express from 'express';
import { userRegister,userLogin,userRefresh,userLogout,getUserByMakh,editUser,getTenkh,requestPasswordReset,resetPassword} from '../controllers/UserController.js';
import {verifyToken} from '../controllers/middlewareController.js';

const router = express.Router();

router.post('/account/register', userRegister);
router.post('/account/login', userLogin);
router.post('/account/refresh', userRefresh);
router.post('/account/logout', userLogout);
router.get('/account/:makh',verifyToken, getUserByMakh);
router.patch('/account/edit/:makh', editUser);
router.get('/account/tenkh/:makh',getTenkh);
router.post('/account/send-mail',requestPasswordReset)
router.post('/account/rspass',resetPassword);

export default router