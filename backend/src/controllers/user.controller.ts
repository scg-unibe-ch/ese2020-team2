
import express, { Router, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { verifyToken } from '../middlewares/checkAuth';
import { checkUniqueUserName, checkUniqueEmail } from '../middlewares/checkRegistration';

const userController: Router = express.Router();
const userService = new UserService();

userController.post('/register',
    (req: Request, res: Response) => {
        // // Check if the emal id entered by the new user and make sure it doesnot exist in the database.
        // if (checkUniqueEmail(req) == null) {
        //     // Once the emailid is true, check for the unique username.
        //     if (checkUniqueUserName(req) == null) {
                userService.register(req.body).then(registered => res.send(registered)).catch(err => res.status(500).send(err));
        //     }
        //     // If the userName already exits, promt the user.
        //     res.status(333).send('User name already exist. Try a different one.');
        // }
        // // If the email already exits, promt the user.
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
