const zod = require("zod");
const jwt = require("jsonwebtoken");
const { Router } = require('express');
const { userModel, accountModel } = require("../db");
const mongoose = require("mongoose");
const { JWT_SECRET } = require("../config");
const authMiddleware  = require("../middleware");

const router = Router();

const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
});

router.post('/signup', async (req, res) => {
    console.log(req.body);
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

    await accountModel.create({
        userId,
        balance: 1 + Math.random() * 10000
    })
    
    const token = jwt.sign({
        userId
    }, JWT_SECRET)

    res.json({
        message: "User created successfully",
        token: token
    })
})

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post('/signin', async (req, res) => {
    const { success } = signinBody.safeParse(req.body);

    if(!success){
        return res.status(411).json({
            message: "Incorrect input format"
        })
    }

    const existingUser = await userModel.findOne({
        username: req.body.username,
        password: req.body.password
    })

    if(existingUser){
        const userId = existingUser._id;
        const token = jwt.sign({
            userId
        }, JWT_SECRET)
    
        return res.json({
            token: token
        })
    }

    res.status(411).json({
        message: "Wrong email/password"
    }); 
})

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
})

router.put('/', authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body);

    if(!success){
        return res.status(411).json({
            message: "Error while updating information"
        })
    }

    await userModel.updateOne({ _id: req.userId }, req.body);
    res.json({
        message: "Updated successfully!"
    })
})

router.get('/bulk', authMiddleware, async (req, res) => {
    
    const objectIdToExclude = req.userId;

    const users = await userModel.find({ _id: { $ne: new mongoose.Types.ObjectId(objectIdToExclude) } });

    res.json({
        users: users.map( user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router;