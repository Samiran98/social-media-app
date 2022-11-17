const express = require('express');
var router = express.Router();

const  apiMiddleware = require("../middleware/authentication");

const authRoutes = require('./auth/index');
const friendshipRoutes = require('./friend/index');


router.use('/auth',authRoutes);
router.use('/friend',apiMiddleware,friendshipRoutes);


module.exports = router;