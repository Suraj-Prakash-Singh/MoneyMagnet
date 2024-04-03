const { Router } = require('express')
const { userModel, accountModel } = require("../db");
const  authMiddleWare  = require("../middleware");
const zod = require("zod");

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
    to: zod.string(),
    amount: zod.number(),
})

router.post('/transfer', authMiddleWare, async (req, res) => {
    const { success } = transferBody.safeParse(req.body);

    if(!success){
        return res.status(411).json({
            message: "Invalid input"
        })
    }

    const { to, amount } = req.body;
    const account = await accountModel.findOne({
        userId: req.userId
    });

    if(account.balance < amount){
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }
    
    const toAccount = await userModel.findOne({
        username: to
    });

    if(!toAccount){
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
    });

    await accountModel.updateOne({
        userId: toAccount._id,
    }, {
        $inc: {
            balance: amount
        }
    });

    res.json({
        message: "Transfer successfull"
    })
})

module.exports = router;