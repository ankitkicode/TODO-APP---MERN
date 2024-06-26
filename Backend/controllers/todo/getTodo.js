const todoModel = require('../../model/todos');

const getTodo = async (req, res) => {
    let isRole = {};
    const { userId, role } = req.body;

    try {
        if (role === "Admin") {
            isRole = {};
        } else {
            isRole = { userId };
        }
        // console.log('Query criteria:', isRole);

        const todos = await todoModel.find(isRole);
        // console.log('todos:', todos);

        if (!todos || todos.length === 0) {
            return res.status(404).json({ message: "No todos found" });
        }

        res.status(200).json(todos);
    } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = getTodo;
