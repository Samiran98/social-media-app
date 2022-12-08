const express = require("express")
const friendController = require("../../controllers/friend")
const { validate } = require('../../middleware/validationMiddleware')
const friendValidation = require('../../validations/friend')

var router = express.Router();

router.post('/send-friend-request',validate(friendValidation.friendRequest), friendController.sendFriendRequest);

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
*       required: false
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               notes:
*                 type: string
*                 required: false
*     parameters:
*        - name: friendUserId
*          in: query
*          description: ID of friend to send request
*          required: true
*          schema:
*            type: integer
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