const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 4001; // Choose a port number
const cors = require('cors');

app.use(cors()); // Use the cors middleware



app.use(bodyParser.json());

const chatHistory = [];

app.post('/addMessage', (req, res) => {
    const { name, message } = req.body;
    const newMessage = {
        time: new Date().toLocaleTimeString(),
        name,
        message,
    };
    chatHistory.push(newMessage);
    res.status(201).json(newMessage);
});

app.get('/getChatHistory', (req, res) => {
    res.json(chatHistory);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
