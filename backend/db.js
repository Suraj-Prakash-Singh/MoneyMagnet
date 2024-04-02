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

module.exports = { userModel };
