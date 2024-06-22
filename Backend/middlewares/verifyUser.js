const todoModel = require("../model/todos");
const jwt = require("jsonwebtoken");

const verifyUser = async (req, res, next) => {
    const token = req.headers['authorization']?.split(" ")[1];
    // console.log("verifyUser token", token);

    if (!token) {
        return res.status(401).json({ message: "verifyUser Token Missing" });
    }

    const { id } = req.params;

    try {
        const todo = await todoModel.findOne({ _id: id });
        
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        const decoded = jwt.verify(token, "JWT_SECERET");  // Corrected secret key

        if (todo.userId === decoded.userId) {
            return next();
        }

        res.status(403).json({ message: "You're not allowed to update this todo" });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = verifyUser;
