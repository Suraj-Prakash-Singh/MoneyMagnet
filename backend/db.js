const mongoose = require('moongoose');

const dbString = "mongodb+srv://admin:FRL8e86CHET20Xfl@cluster0.sgf6vcz.mongodb.net/money-magnet-db";

mongoose.connect(dbString, () => {
    console.log("db connected");
});

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
    password: {
        type: String,
        required :true,
        minLength: 6
    }
});

const userModel = mongoose.model('User', userSchema);

module.exports = { userModel };
