const mongoose = require("mongoose");

const dbConnection = async () => {
   await mongoose
   .connect("mongodb://localhost:27017/UserDetails")
   .then(() => {
            console.log("DB connected successfully");
        }).catch((err) => {
            console.log(err.message);
            
        })
}

module.exports = dbConnection;