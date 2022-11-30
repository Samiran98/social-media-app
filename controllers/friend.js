require('dotenv').config();
const User = require("../models").user
const Friend = require("../models").user_friend

module.exports = {
    sendFriendRequest
}

async function sendFriendRequest(req,res) {
    try {

        const { id,firstName } = req.user
        

        return res.status(201).json({ status: 'ok',statusCode:"201", message: `${firstName} sent you a friend request` })
    } catch (err) {
        console.log(err);
        return res.status(403).json({ status: 'error',statusCode:"403", message: err.message })
    }
}