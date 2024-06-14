const todoModel = require('../../model/todos');

const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await todoModel.findByIdAndDelete(id);
        
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.status(203).json({ message: "Deleted successfully", todo });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = deleteTodo;
