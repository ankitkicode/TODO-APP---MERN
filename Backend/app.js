const express = require('express');
const connection = require('./config/db'); // Ensure this is the correct path and function name
const router = require('./routes/users');
// Load environment variables from .env file
require('dotenv').config();

const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || 'localhost'; 
const app = express();

app.use(express.json());

app.use('/users', router);

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
