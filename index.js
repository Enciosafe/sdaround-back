import express from 'express'
import mongoose from "mongoose";
import { registerValidation } from './validations/auth.js'
import checkAuth from './utils/checkAuth.js'
import * as UserController from './controllers/UserController.js'



mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://admin:12345qwert@cluster0.lyl2jml.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DataBase OK'))
    .catch((err) => console.log('DataBase error', err))


const app = express();

app.use(express.json())

app.post('/auth/login', UserController.login)
app.post('/auth/register/', registerValidation, UserController.register)
app.get('/auth/me', checkAuth, UserController.getMe)

app.listen(4444, (err) => {
    if(err) {
        return console.log(err);
    }

    console.log('Server OK')
});
