import mongoose from 'mongoose';

const cartsCollection = 'carts';

const cartSchema = new mongoose.Schema({
    products: {
        type: [
            {
                product: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true },
                quantity: { type: Number, default: 1 }
            },
        ],
        default: [],
    }
});

cartSchema.pre('findOne', function (next) {
    this.populate('products.product');
    next();
});

const cartModel = mongoose.model(cartsCollection, cartSchema);

export default cartModel;