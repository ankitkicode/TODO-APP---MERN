const express = require('express');
const connection = require('./config/db'); // Ensure this is the correct path and function name
const router = require('./routes/users');
const routerTodo = require('./routes/todo');
const cors = require('cors');

// Load environment variables from .env file
require('dotenv').config();

const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || 'localhost'; 
const app = express();






const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your frontend URL
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  
app.use(cors(corsOptions));
  
// Handling OPTIONS preflight requests
app.options('*', cors());
app.use(express.json());

app.use('/users', router);
app.use('/todos', routerTodo);

app.get("/", (req, res) => {
    res.send("Get route chal gya hai bhi log");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message });
});

app.listen(PORT,HOST, async () => {
    try {
        const url = `http://${HOST}:${PORT}`;
        await connection(process.env.URI); // Ensure URI is defined in .env and correct
        console.log(`Server is running at ${url} and DB connected successfully`);
    } catch (error) {
        console.error(`Failed to connect to the database: ${error.message}`);
        process.exit(1); // Exit the process with a failure code
    }
});
