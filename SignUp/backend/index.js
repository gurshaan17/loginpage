const express = require("express")
const cors = require("cors")
const { User } = require("./db")
const bcrypt = require('bcrypt');
const app = express()
const PORT = 3000
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
app.use(cors())
app.use(express.json())

app.post("/signin", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (user) {
            const result = await bcrypt.compare(req.body.password, user.password);
            if (result) {
                res.json({ message: "Login successful" }); // Changed to JSON response
            } else {
                res.status(401).json({ error: "Invalid password" }); // Changed status code and message
            }
        } else {
            res.status(404).json({ error: "User not found" }); // Changed status code and message
        }
    } catch (error) {
        console.error(error); // Log the error
        res.status(500).json({ error: "Internal server error" }); // Added proper error message
    }
})

app.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
    try {
        const userExists = await User.findOne({ username: username });
        if (userExists) {
          return res.status(409).json({ error: 'Username already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            username,
            password: hashedPassword
        });
        res.status(200).json({ message: 'User signed up successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
})
