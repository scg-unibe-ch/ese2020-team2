
import express, { Router, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { verifyToken } from '../middlewares/checkAuth';
import {checkUniqueUserName, checkUniqueEmail} from '../middlewares/checkRegistration';

const userController: Router = express.Router();
const userService = new UserService();

userController.post('/register',
    (req: Request, res: Response) => {
       // if (checkUniqueEmail(req) == null) {
          // if (checkUniqueUserName(req) == null) {
                userService.register(req.body).then(registered => res.send(registered)).catch(err => res.status(500).send(err));
           // }
          //  res.status(333).send('User name already exist. Try a different one.');
        // }
        // res.status(333).send('Email already exist. Try with new one.');
     }
);

userController.post('/login',
    (req: Request, res: Response) => {
        userService.login(req.body).then(login => res.send(login)).catch(err => res.status(500).send(err));
    }
);

userController.get('/', verifyToken, // you can add middleware on specific requests like that
    (req: Request, res: Response) => {
        userService.getAll().then(users => res.send(users)).catch(err => res.status(500).send(err));
    }
);

export const UserController: Router = userController;
