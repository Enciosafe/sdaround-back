import express from 'express'
import jwt from 'jsonwebtoken'
import mongoose from "mongoose";

mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://Stas:123qwerty@cluster0.eb957or.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('DataBase OK'))
    .catch((err) => console.log('DataBase error', err))


const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello bitchsdasd!')
});

app.post('/auth/login/', (req, res) => {
    console.log(req.body);

    const token = jwt.sign({
        email: req.body.email,
        fullName: 'Ukraine'
    },
        'secret123'
    );
    res.json({
        success:true,
        token,
    })
})

app.listen(4444, (err) => {
    if(err) {
        return console.log(err);
    }

    console.log('Server OK')
});
