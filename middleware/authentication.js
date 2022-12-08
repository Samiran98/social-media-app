require('dotenv').config();
const User = require("../models").user

const jwt = require('jsonwebtoken');

const apiAuth = async (req, res, next) => {
  // console.log(req.headers['authorization']);
  if (!(req.headers && req.headers['authorization'])) {
    // return errorResponse(req, res, 'Token is not provided', 401);
    return res.status(401).json({ status: 'Authorization Error',statusCode:"401", message: 'Invalid Authorization' })
  }
  const token = req.headers['authorization'].split(' ')[1];
  console.log(token);
  try {
    var decoded = jwt.verify(token, process.env.SECRET_KEY);

    // req.user.id = decoded.id;
    // console.log(decoded);
    const user = await User.findOne({
      where: { id: decoded.id },
    });
    
    if (!user) {
      // return errorResponse(req, res, 'User is not found in system', 401);
      return res.status(401).json({ status: 'error',statusCode:"401", message: 'User is not found in system' })
  }
    const reqUser = { ...user.get() };
    reqUser.userId = user.id;
    req.user = reqUser;
    return next();
  } catch (err) {
    // return errorResponse(
    //   req,
    //   res,
    //   'Incorrect token is provided, try re-login',
    //   401,
    // );
    console.log(err);
    return res.status(401).json({ status: 'Error',statusCode:"401", message: 'Incorrect token is provided, try again' })
  }
};

module.exports = apiAuth;