const bcrypt = require('bcrypt');
const userModel = require('../../model/user');


const userRegister = async (req, res, next) => {
    const { username, email, password, role } = req.body;
    // Log the received data for debugging
    console.log('Received data:', { username, email, password, role });

    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(203).json({ message: "User already registered!" });
        }

        // Check if password is a valid string
        if (typeof password !== 'string' || password.trim() === '') {
            return res.status(400).json({ message: "Password must be a non-empty string" });
        }

        // Log before hashing the password
        console.log('Hashing password:', password);

        const saltRounds = 10; // Number of salt rounds
        const hashPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new userModel({
            username,
            email,
            password: hashPassword,
            role
        });

        await newUser.save();

        return res.status(201).json({ message: "User created successfully", newUser });
    } catch (error) {
        console.error('Error:', error); // Debugging line
        next(error);
    }
};

module.exports = userRegister;
