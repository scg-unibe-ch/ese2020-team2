import { Request, Response } from 'express';
import { UserAttributes, User } from '../models/user.model';

/**
 * Responsible for the registration checks: E-Mail and UserName have to be unique, two or more
 * user shouldn't have same e-mails or username (easier to distinguish them and avoids multiple account
 * registration <-> with same E-mail).
 *
 * @param req parameter is needed to get the E-mail/Username input from the User to check for unique
 * value
 */

// This function is used to check if the email id entered by the new user already exists in the database.
export async function checkUniqueEmail(req: Request) {
     await User.findOne({ where: { email: req.body.email } });
}

// This function is used to check if the userName entered by the new user already exists in the database.
export async function checkUniqueUserName(req: Request) {
    return await User.findOne({ where: { userName: req.body.userName } });
}
