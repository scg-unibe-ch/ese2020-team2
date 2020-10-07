import { Request, Response } from 'express';
import { UserAttributes, User } from '../models/user.model';
const minLength = 7;
const maxLength = 18;
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

/**
function passwordLengthRange() {

    const minLength = 7;
    const maxLength = 18;

    const userInput = ""; // where can I import the user Input?
    if (userInput.length >= minLength && userInput.length <= maxLength) {
        return true;
    } else {
        alert('Please input a password between ' + minLength + ' and ' + maxLength + ' characters!');
        return false;
    }
}
*/

/**
function userNameLengthRange() {

    const minLength = 7;
    const maxLength = 18;

    const userInput = ""; // where can I import the user Input?
    if (userInput.length >= minLength && userInput.length <= maxLength) {
        return true;
    } else {
        alert('Please input an username between ' + minLength + ' and ' + maxLength + ' characters!');
        return false;
    }
}
*/
// This function is used to check if the userName entered by the new user already exists in the database.
export async function checkUniqueUserName(req: Request) {
    return await User.findOne({ where: { userName: req.body.userName } });
}
