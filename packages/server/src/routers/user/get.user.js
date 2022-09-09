const express = require('express');
const router = express.Router();
const { verifyToken } = require('../../lib/token');
const { user } = require('../../../models');
const {auth} = require("../../helpers/auth")

const verifyUserController = async (req, res, next) => {
  try {
    const { token } = req.params;

    const getUserToken = await user.findOne({
      where: { token },
    });

    if (!getUserToken)
      return res.send(
        '<h2>your token has expired, please use the new token</h2>',
      );

    const verifiedToken = verifyToken(token);

    const [resUpdateIsVerifiedStatus] = await user.update(
      { isVerified: true },
      {
        where: {
          userId: verifiedToken.userId,
        },
      },
    );

    if (!resUpdateIsVerifiedStatus)
      throw { message: 'Failed verification user' };

    res.send('<h1>Verification success</h1>');
  } catch (error) {
    next(error);
  }
};

const getUser = async (req,res,next) => {
    try {
        const {userId} = req.params
        const resGetUser = await user.findOne({
            where : {userId}
        })
        const {dataValues} = resGetUser
        res.send({data : dataValues})
    } catch (error) {
        next(error)
        console.log(error);
    }
}

const getUserWithToken = async (req,res,next) => {
    try {
        const token = req.params
        const verifiedToken = verifyToken(token)
        
        const {userId} = verifiedToken.user
        const resGotUser= await user.findOne({where: {userId}})
        console.log(resGotUser);
        res.send({ 
            status: "Success",
            message: "Get user with token",
            user: resGotUser,
        })
    } catch (error) {
        next(error)
        console.log(error);
    }
}

router.get("/userToken", getUserWithToken)
router.get("/:userId",getUser)
router.get('/verification/:token', verifyUserController);

module.exports = router