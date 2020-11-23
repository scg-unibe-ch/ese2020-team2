import { Request, Response } from 'express';
import { UserAttributes, User } from '../models/user.model';

// This function is used to check if the emal id entered by the new user already exists in the database.
export async function checkUniqueEmail(req: Request, res: Response) {
     return await User.findOne({ where: { email: req.body.email } });
}

// This function is used to check if the userName entered by the new user already exists in the database.
export async function checkUniqueUserName(req: Request, res: Response) {
    return await User.findOne({ where: { userName: req.body.userName } });
}

// This function is used to check if the userName entered by the new user already exists in the database.
export async function ownerExist(req: Request, res: Response) {
    return await User.findOne({ where: { role: 'owner' } });
}
