const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017")
# Provide your own mongoDB connection string here

userSchema = new mongoose.Schema({
    username: String,
    password: String
})

const User = mongoose.model("User", userSchema)

module.exports = {
    User
}

