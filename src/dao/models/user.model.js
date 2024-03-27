import mongoose from 'mongoose';

const usersCollection = 'users';

const userSchema = new mongoose.Schema({
    first_name: { type: String, filter: true, default: '' },
    last_name: { type: String, filter: true },
    email: { type: String, required: true, unique: true, filter: true },
    age: { type: Number, default: 0 },
    password: { type: String, default: '' },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'carts', required: true, unique: true },
    role: { type: String, default: 'user' }
});

const userModel = mongoose.model(usersCollection, userSchema);

export default userModel;