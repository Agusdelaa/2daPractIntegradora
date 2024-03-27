// import mongoose from 'mongoose';

// const messagesCollection = 'messages';

// const messageSchema = new mongoose.Schema({
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true, filter: true },
//     message: { type: String, required: true },
//     date: { type: Date, default: Date.now }
// });

// messageSchema.pre('find', function (next) {
//     this.populate('user');
//     next();
// });

// const messageModel = mongoose.model(messagesCollection, messageSchema);

// export default messageModel;