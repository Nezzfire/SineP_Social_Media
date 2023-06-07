const ApiError = require('../error/ApiError')
const {User, UserSettings} = require('../models/models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const generateJwt = (user) => {
    return jwt.sign(
        {user},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {
            name,
            surname,
            nickname,
            password,
            birthday,
            country,
            city,
            phone,
            email,
            genderId,
            avatar,
            profile_description
        } = req.body

        const userSettings = await UserSettings.create({
            nsfw: false,
            politic: false,
            language: 'en',
            font_size: 'Default'
        })


        const candidate = await User.findOne({where: {nickname}})
        if (candidate) {
            return next(ApiError.badRequest('User is existing'))
        }

        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create(
            {
                name,
                surname,
                nickname,
                password: hashPassword,
                birthday: Date.parse(birthday),
                country,
                genderId,
                phone,
                email,
                city,
                avatar,
                profile_description,
                userSettingId: userSettings.id
            }
        )

        const clone = Object.assign({}, user);
        delete clone.password;
        delete clone.userSettingId;

        const token = generateJwt(clone);
        return res.json({token});

    }

    async login(req, res, next) {
        const {nickname, password} = req.body;
        const user = await User.findOne({where: {nickname}})
        if (!user) {
            return next(ApiError.internal('No user with such login'));
        }

        const comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Incorrect password'));
        }

        const clone = Object.assign({}, user);
        delete clone.password;
        delete clone.userSettingId;

        const token = generateJwt(clone)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController()
