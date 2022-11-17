const express = require("express")
const userController = require("../../controllers/user")

var router = express.Router();

router.post('/login', userController.login);
router.post('/register', userController.createUser)

module.exports = router

/**
* @swagger
*   /api/auth/login:
*   post:
*     summary: Login as s Sonet user
*     description: Login as a user in Sonet and do stuff..
*     tags: ['Auth']
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               firstName:
*               email:
*                 type: string
*                 description: The user's name.
*                 example: sg@gmail.com
*               password:
*                 type: string
*                 description: The user's name.
*                 example: string
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
    
/**
 * @swagger
 *   /api/auth/register:
 *   post:
 *     summary: Create a SoNet user.
 *     tags: ['Auth']
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The user's name.
 *                 example: Samiran
 *               lastName:
 *                 type: string
 *                 description: The user's name.
 *                 example: Ghosh
 *               username:
 *                 type: string
 *                 description: The user's name.
 *                 example: name@1234
 *               email:
 *                 type: string
 *                 description: The user's name.
 *                 example: sg@gmail.com
 *               mobile:
 *                 type: string
 *                 description: The user's mobile.
 *                 example: 987548548
 *               intro:
 *                 type: string
 *                 description: The user's introduction.
 *                 example: I like to listne to music
 *               profile:
 *                 type: string
 *                 description: The user's profile details.
 *                 example: profile details
 *               password:
 *                 type: string
 *                 description: The user's name.
 *                 example: string
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