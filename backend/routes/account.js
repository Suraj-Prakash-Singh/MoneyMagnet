const { Router } = require('express')
const { userModel, accountModel } = require("../db");
const  authMiddleWare  = require("../middleware");
const zod = require("zod");
const mongoose = require('mongoose');

const router = Router();

router.get('/balance', authMiddleWare, async (req, res) => {
    const userId = req.userId;

    const userAccount = await accountModel.findOne({
        userId: userId
    })

    res.json({
        balance: userAccount.balance
    })
})

const transferBody = zod.object({
    to: zod.string().email(),
    amount: zod.number(),
})

router.post('/transfer', authMiddleWare, async (req, res) => {
    console.log("transfer body: ", req.body);
    const { success } = transferBody.safeParse(req.body);

    if(!success){
        return res.status(411).json({
            message: "Invalid input"
        })
    }

    const session = await mongoose.startSession();    //creating a mongoose session for txns

    session.startTransaction();                 //starting a txn
    const { to, amount } = req.body;
    const account = await accountModel.findOne({ userId: req.userId }).session(session);

    if(account.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }
    
    const toAccount = await userModel.findOne({ username: to }).session(session);

    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        })
    }

    await accountModel.updateOne({
        userId: req.userId,
    }, {
        $inc: {
            balance: -amount
        }
    }).session(session);

    //perfoirming transfer
    await accountModel.updateOne({
        userId: toAccount._id,
    }, {
        $inc: {
            balance: amount
        }
    }).session(session);

    //commiting the txn
    await session.commitTransaction();
    res.json({
        message: "Transfer successfull"
    })
})

module.exports = router;