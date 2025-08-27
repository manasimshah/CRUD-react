const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    UserName: {
        type: String, 
        require: true
    }, 
    EmailId: {
        type: String, 
        require: true
    }, 
    PhoneNumber: {
        type: Number, 
        require: true
    }, 
    Role: {
        type: String
    }
}, {
    timestamps: true
})

const Users = mongoose.model("users", userSchema);

module.exports = {Users};