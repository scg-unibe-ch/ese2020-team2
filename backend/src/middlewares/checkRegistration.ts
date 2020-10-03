import { Request, Response } from 'express';
import { UserAttributes, User } from '../models/user.model';


export async function checkUniqueEmail(req: Request) {
    return await User.findOne({where: {email: req.body.email}});


}

export async function checkUniqueUserName(req: Request) {
    return await User.findOne({where: {userName: req.body.userName}});
}
