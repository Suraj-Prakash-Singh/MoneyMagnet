const mongoose = require('mongoose');

const dbString = "mongodb+srv://admin:FRL8e86CHET20Xfl@cluster0.sgf6vcz.mongodb.net/money-magnet-db";

mongoose.connect(dbString)
        .then(() => console.log("connected sucessfully to db"))
        .catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required :true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50 
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
});

const userModel = mongoose.model('User', userSchema);

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, //reference to the user model
        ref: 'User',
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    }
});

const accountModel = mongoose.model('Account', accountSchema);

module.exports = { userModel, accountModel };
