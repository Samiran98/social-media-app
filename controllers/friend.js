require('dotenv').config();
const User = require("../models").user
const Friend = require("../models").user_friend

module.exports = {
    sendFriendRequest
}

async function sendFriendRequest(req,res) {
    try {

        const { id,firstName } = req.user
        const { friendUserId } = req.query
        const { notes } = req.body

        const data = await Friend.create({
            sourceId: id,
            targetId: friendUserId,
            type: 1,
            status: 1,
            notes: notes || null
        })

        if(!data) return res.status(201).json({ statusCode:"502", message: 'Friend request not sent!' })
        
        return res.status(201).json({ data: data,statusCode:"201", message: 'Friend request sent.' })

    } catch (err) {
        console.log(err);
        return res.status(403).json({ status: 'error',statusCode:"403", message: err.message })
    }
}