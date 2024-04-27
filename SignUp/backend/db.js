const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://admin1:admin1@cluster0.4lgwcnp.mongodb.net/")

userSchema = new mongoose.Schema({
    username: String,
    password: String
})

const User = mongoose.model("User", userSchema)

module.exports = {
    User
}

