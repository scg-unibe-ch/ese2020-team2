import { UserAttributes, User } from '../models/user.model';
import { LoginResponse, LoginRequest } from '../models/login.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserService {

    public register(user: UserAttributes): Promise<UserAttributes> {
        const saltRounds = 12;
        user.password = bcrypt.hashSync(user.password, saltRounds); // hashes the password, never store passwords as plaintext
        return User.create(user).then(inserted => Promise.resolve(inserted)).catch(err => Promise.reject(err));
    }

    public updateUser(user: UserAttributes, userId: string): Promise<User> {
        const saltRounds = 12;
        if (user.password != null) {
            user.password = bcrypt.hashSync(user.password, saltRounds);
        }
        return User.findByPk(userId)
            .then(found => {
                if (found != null) {
                    found.update(user)
                    .then(updated => Promise.resolve(updated));
                } else {
                    return Promise.reject({ message: 'User not found.' });
                }
            })
            .catch(err => Promise.reject({ message: err }));
    }


    public login(loginRequestee: LoginRequest): Promise<User | LoginResponse> {
        const secret = process.env.JWT_SECRET;
        return User.findOne({
            where: {
                userName: loginRequestee.userName
            }
        })
            .then(user => {
                // compares the hash with the password from the lognin request
                if (bcrypt.compareSync(loginRequestee.password, user.password)) {
                    const token: string = jwt.sign({ userName: user.userName, userId: user.userId }, secret, { expiresIn: '2h' });
                    return Promise.resolve({ user, token });
                } else {
                    return Promise.reject({ message: 'not authorized' });
                }
            })
            .catch(err => Promise.reject({ message: err }));
    }

    public getAll(): Promise<User[]> {
        return User.findAll();
    }
}
