import express, { Router, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { verifyToken } from '../middlewares/checkAuth';
import { checkUniqueEmail, checkUniqueUserName, ownerExist } from '../middlewares/checkRegistration';
import { User } from '../models/user.model';

const userController: Router = express.Router();
const userService = new UserService();

/**
 * The responsibilities of this class is to check user functionalities, such like unique registration inputs
 * (the user shouldn't be allowed to register as the same name of an other user, the mail should be unique,
 * to also avoid multiple account associated at the same E-mail, etc.)
 */

userController.post('/register',
    async (req: Request, res: Response) => {
        let isOwnerExist = false;
        // Check if there exists a owner already.
        if (req.body.role === 'owner') {
            if (await ownerExist(req, res)) {
                isOwnerExist = true;
                res.status(333).send('The application can have only one owner.');
            }
        }
        // Check if the email id entered by the new user and make sure it does not exist in the database.
        if (!await checkUniqueEmail(req, res)) {
            // Once the email id is true, check for the unique username.
            if (!await checkUniqueUserName(req, res)) {
                if (!isOwnerExist) {
                    await userService.register(req.body)
                        .then(registered => res.send(registered))
                        .catch(err => res.status(500).send(err));
                }
            }
            // If the userName already exits, prompt the user.
            res.status(333).send('User name already exist. Try a different one.');
        }
        // If the email already exits, prompt the user.
        res.status(333).send('Email already exist. Try with new one.');
    }
);

userController.post('/login',
    (req: Request, res: Response) => {
        userService.login(req.body).then(login => res.send(login)).catch(err => res.status(500).send(err));
    }
);

userController.get('/all', verifyToken, // you can add middleware on specific requests like that
    (req: Request, res: Response) => {
        userService.getAll().then(users => res.send(users)).catch(err => res.status(500).send(err));
    }
);

userController.put('/editUser/:id', (req: Request, res: Response) => {
    User.findByPk(req.params.id)
        .then(found => {
            if (found != null) {
                found.update(req.body).then(() => {
                    res.status(200).send('User information updated successfully.');
                });
            } else {
                res.status(404).send('User not found.');
            }
        })
        .catch(err => res.status(500).send(err));
});

/**
 * Gets the password reset question, answer and the userId for the password reset functionality.
 */
userController.get('/passwordReset/:name',
    (req: Request, res: Response) => {
        User.findOne({ attributes: ['userId', 'passwordQuestion', 'passwordAnswer'], where: { userName: req.params.name } })
            .then(user => res.status(200).send(user))
            .catch(err => res.status(500).send('User not found.'));
    });

export const UserController: Router = userController;
