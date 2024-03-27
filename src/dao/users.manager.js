import userModel from "./models/user.model.js";
import { CartsManagerDB } from "./carts.manager.DB.js";
import { createHash } from "../utils.js";

export class UsersManager {
    static #instance;

    constructor() { }

    static getInstance() {
        if (!UsersManager.#instance) {
            UsersManager.#instance = new UsersManager();
        }
        return UsersManager.#instance;
    }

    async getUserByEmail(email) {
        try {
            const user = await userModel.findOne({ email });
            return user;
        } catch (error) {
            throw error;
        }
    }

    async createUser(user) {
        try {
            if (user.password && user.password.length > 0) {
                user.password = createHash(user.password);
            }
            const cart = await CartsManagerDB.getInstance().createCart();
            user.cart = cart._id;
            const newUser = await userModel.create(user);
            if (!newUser) {
                throw new Error('No se pudo crear el usuario');
            }
            return newUser;
        } catch (error) {
            throw error;
        }
    }
}
