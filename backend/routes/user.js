const { Router } = require('express');
const zod = require("zod");
const { userModel } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const router = Router();

const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
});

router.post('/signup', async (req, res) => {
    const { success } = signupBody.safeParse(req.body);
    
    if(!success){
        return res.status(411).json({
            message: "Email already taken/ Incorrect inputs"
        })
    }

    const existingUser = await userModel.findOne({
        username: req.body.username
    })
    
    if(existingUser){
        return res.status(411).json({
            message: "Email already taken/ Incorrect inputs"
        })
    }

    const user = await userModel.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });

    const userId = user._id;
    
    const token = jwt.sign({
        userId
    }, JWT_SECRET)

    res.json({
        message: "User created successfully",
        token: token
    })
})
module.exports = router;