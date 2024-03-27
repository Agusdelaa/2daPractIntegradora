import express from 'express';
import cookieParser from 'cookie-parser';
import handlebars from 'express-handlebars';
import passport from 'passport';
import mongoose from 'mongoose';


import { __dirname } from './utils.js';
import initializePassport from './config/passport.config.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import sessionsRouter from './routes/sessions.router.js';
import viewsRouter from './routes/views.router.js';


const PORT = 8080;
const URI = "mongodb+srv://dagustin001:robertito2210@clusterentregaintegrado.eed0qzq.mongodb.net/Prue2Inter?retryWrites=true&w=majority";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use(cookieParser('mySecret'));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

initializePassport();
app.use(passport.initialize());

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/', viewsRouter);

const httpServer = app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

mongoose.connect(URI)
    .then(() => console.log('Database connected'))
    .catch(error => console.log(`Database connection error: ${error}`));

// const io = new Server(httpServer);
// io.on('connection', async (socket) => {
//     try {
//         const messages = await MessagesManager.getInstance().getMessages();
//         socket.emit('messages', messages);
//     } catch (error) {
//         socket.emit('messages', []);
//     }

//     socket.on('message', async (user, message) => {
//         try {
//             await MessagesManager.getInstance().addMessage(user, message);
//             const messages = await MessagesManager.getInstance().getMessages();
//             io.emit('messages', messages);
//         } catch (error) {
//             io.emit('messages', []);
//         }
//     });
// });