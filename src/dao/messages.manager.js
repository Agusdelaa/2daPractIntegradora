// import messageModel from "./models/message.model.js";

// export class MessagesManager {
//     static #instance;

//     constructor() { }

//     static getInstance() {
//         if (!MessagesManager.#instance) {
//             MessagesManager.#instance = new MessagesManager();
//         }
//         return MessagesManager.#instance;
//     }

//     async getMessages() {
//         return await messageModel.find();
//     }

//     async addMessage(user, message) {
//         return await messageModel.create({ user, message });
//     }
// }
