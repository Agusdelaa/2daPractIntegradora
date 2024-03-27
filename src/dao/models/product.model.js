import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productsCollection = 'products';

const productSchema = new mongoose.Schema({
    title: { type: String, required: true, index: true },
    description: { type: String, default: '' },
    code: { type: String, required: true, unique: true, index: true },
    price: { type: Number, default: 0 },
    status: { type: Boolean, default: false },
    stock: { type: Number, default: 0 },
    category: { type: String, default: 'Sin categoria', index: true },
    thumbnails: { type: [String], default: [] }
});

productSchema.plugin(mongoosePaginate);

const productModel = mongoose.model(productsCollection, productSchema);

export default productModel;