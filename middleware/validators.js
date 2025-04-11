const validator = require('node-email-validation')

module.exports = {

    validateRegister: (req, res, next) => {
        const {username, passOne, passTwo, special_code} = req.body

        if (username.length < 4 || username.length > 20) return res.send({
            message: 'username length must be between 4 and 20 characters',
            success: false
        })
        if (passOne.length < 4 || passOne.length > 20) return res.send({
            message: 'password length must be between 4 and 20 characters',
            success: false
        })
        if (passOne !== passTwo) return res.send({message: 'passwords do not match', success: false});

        if(special_code !== process.env.SPECIAL_CODE) return res.send({message: 'wrong special code', success: false});

        next()
    },

    validateRegisterUser: (req, res, next) => {
        const {email, passOne, passTwo} = req.body

        if (!validator.is_email_valid(email)) return res.send({message: 'wrong email address', success: false});

        if (passOne.length < 4 || passOne.length > 20) return res.send({
            message: 'password length must be between 4 and 20 characters',
            success: false
        })
        if (passOne !== passTwo) return res.send({message: 'passwords do not match', success: false});

        next()
    },

    validateLogin: (req, res, next) => {
        const {username, password} = req.body

        next()
    },
    doctorValidator: (req, res, next) => {

        const {doctor} = req.body.user
        if(!doctor) return res.send({message: 'bad credentials', success: false})

        next()
    },

    passwordValidator: (req, res, next) => {
        const {passOne, passTwo} = req.body

        if (passOne.length < 4 || passOne.length > 20) return res.send({
            message: 'password length must be between 4 and 20 characters',
            success: false
        })
        if (passOne !== passTwo) return res.send({message: 'passwords do not match', success: false});

        next()

    }
}