require('dotenv').config();
const User = require("../models").user
const uuid = require('uuid')
const bcrypt = require('bcrypt')
const saltRounds = 12
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.SECRET_KEY

module.exports = {
    createUser,
    login
}

async function createUser(req,res) {
    try {
        const { firstName, lastName, email, mobile , intro , profile , username, password: plainTextPassword } = req.body

        if (!username || typeof username != 'string') {
            return res.json({ error: 'username must be a string' })
        }
    
        if (!plainTextPassword || typeof plainTextPassword != 'string') {
            return res.json({ error: 'Invalid password' })
        }
    
        if (plainTextPassword.length < 5) {
            return res.json({ error: 'Password too small' })
        }
    
        const password = await bcrypt.hash(plainTextPassword, saltRounds)

        const user_uuid = uuid.v4()

        const user = {
            uuid : user_uuid,
            firstName : firstName,
            lastName : lastName,
            username : username,
            email : email,
            mobile: mobile,
            password : password,
            intro : intro,
            profile : profile,
            lastLogin : new Date()
        }

        const data = await User.create(user)

        if(!data) return res.json({error : 'User cannot be created!'})

        return res.json({data: data,success : 'User created successfully'})

    } catch (err) {
        console.log(err);
        return res.json('Something went wrong!')
    }
}

async function login(req,res) {
    const { email, password } = req.body
    

    const user = await User.findOne({
        where: {
            email : email
        }
    })

    if (!user) {
        return res.status(401).json({ status: 'error', error: 'Invalid username/password' })
    }

    if (await bcrypt.compare(password, user.password)) {
        // the username ,password combination is succerssful

        const token = jwt.sign({
            id: user.id,
            username: user.username
        }, JWT_SECRET)

        return res.status(201).json({ status: 'ok',statusCode:"201", data: user, token: token, message: 'Login Successful' })
    } else {
        return res.status(403).json({ status: 'error',statusCode:"403", message: 'Invalid password' })
    }
}