import { body } from 'express-validator'

export const registerValidation = [
    body('email', 'It is bad email, bro').isEmail(),
    body('password', 'It is bad password, bro').isLength({min: 5}),
    body('fullName', 'It is bad name, bro').isLength({min: 3}),
    body('avatarUrl', 'It is bad url, bro').optional().isURL(),
]
