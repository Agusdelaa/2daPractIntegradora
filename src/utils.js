import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const __dirname = dirname(fileURLToPath(import.meta.url));

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password);

const PRIVATE_KEY = 'myPrivateKey';
export const generateToken = (res, user) => {
    const userWithoutPassword = {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        age: user.age,
        cart: user.cart,
        role: user.role
    };
    const token = jwt.sign({ user: userWithoutPassword }, PRIVATE_KEY, { expiresIn: '1h' });
    res.cookie('token', token, { maxAge: 60 * 60 * 1000, httpOnly: true, signed: true });
};