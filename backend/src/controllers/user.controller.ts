
import express, { Router, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { verifyToken } from '../middlewares/checkAuth';
import { checkUniqueUserName, checkUniqueEmail } from '../middlewares/checkRegistration';

const userController: Router = express.Router();
const userService = new UserService();

/**
 * The responsibilities of this class is to check user functionalities, such like unique registration inputs
 * (the user shouldn't be allowed to register as the same name of an other user, the mail should be unique,
 * to also avoid multiple account associated at the same E-mail, etc.)
 */

userController.post('/register',
    (req: Request, res: Response) => {
        //  //     Check if the email id entered by the new user and make sure it does not exist in the database.
        //    if (checkUniqueEmail(req) == null) {
        // //          Once the email id is true, check for the unique username.
        //        if (checkUniqueUserName(req) == null) {
                userService.register(req.body).then(registered => res.send(registered)).catch(err => res.status(500).send(err));
    //            }
    //     //          If the userName already exits, prompt the user.
    //            res.status(333).send('User name already exist. Try a different one.');
    //        }
    //   //        If the email already exits, prompt the user.
    //      res.status(333).send('Email already exist. Try with new one.');

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
