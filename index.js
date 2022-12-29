import express from 'express'
import multer from 'multer'
import mongoose from "mongoose";

import {loginValidation, postCreateValidation, registerValidation} from './validations.js'
import {UserController, PostController} from './controllers/index.js'
import {checkAuth, handleValidationErrors} from './utils/index.js'


mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://admin:12345qwert@cluster0.lyl2jml.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DataBase OK'))
    .catch((err) => console.log('DataBase error', err))


const app = express();

const storage = multer.diskStorage({
    destination: (_ , __ , cb) => {
        cb(null, 'uploads')
    },
    filename: (_ , file, cb) => {
        cb(null, file.originalname)
    },
});

const upload = multer({ storage })

app.use(express.json())
app.use('/uploads', express.static('upload'))

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)
app.post('/auth/register/', registerValidation,  handleValidationErrors, UserController.register)
app.get('/auth/me', checkAuth, UserController.getMe)

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    })
})

app.get('/posts', PostController.getAll)
app.get('/posts/:id', PostController.getOne)
app.delete('/posts/:id', checkAuth, PostController.remove)
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create)
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update)


app.listen(4444, (err) => {
    if(err) {
        return console.log(err);
    }

    console.log('Server OK')
});
