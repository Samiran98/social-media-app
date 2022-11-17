const express = require("express")
const friendController = require("../../controllers/friend")

var router = express.Router();

router.post('/send-friend-request', friendController.sendFriendRequest);

module.exports = router

/**
* @swagger
*   /api/friend/send-friend-request:
*   post:
*     security: 
*       - auth_key: []
*     summary: send friend request
*     description: Send friend request to a friend
*     tags: ['Friend']
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               friendsUserId:
*                 type: integer
*                 description: The friend's id.
*     responses:
*       200:
*         description: Created Successfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 data:
*                   type: object
*/