import { body } from 'express-validator'

export const registerValidation = [
    body('email', 'It is bad email, bro').isEmail(),
    body('password', 'It is bad password, bro').isLength({min: 5}),
    body('fullName', 'It is bad name, bro').isLength({min: 3}),
    body('avatarUrl', 'It is bad url, bro').optional().isURL(),
]

export const loginValidation = [
    body('email', 'It is bad email, bro').isEmail(),
    body('password', 'It is bad password, bro').isLength({min: 5}),
]

export const postCreateValidation = [
    body('title', 'Введіть заголовок статті ').isLength({ min:3 }).isString(),
    body('text', 'Введіть текст статті').isLength({min: 10}).isString(),
    body('tags', 'Невірний формат тегів (укажіть массив)').optional().isString(),
    body('imageUrl', 'Невірне посилання на зображення').optional().isString(),
]


