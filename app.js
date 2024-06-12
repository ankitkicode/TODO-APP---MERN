const express = require('express');
const connetion = require('./config/db');
// Load environment variables from .env file
require('dotenv').config();

const PORT = process.env.PORT || 8000;
const host = process.env.HOST || 'localhost'; 
const app = express();

app.get("/",(req,res)=>{
res.send("Get route chal gya hai bhi log");
});

app.listen(PORT ,host , async()=>{
    try {
        const url = `http://${host}:${PORT}`;
        await connetion(process.env.URI)
        console.log(`Servver is starting on PORT ${url} And DB Connected successfully`);
    } catch (error) {
        
    }
})