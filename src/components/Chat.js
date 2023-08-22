import React, {useEffect, useState} from 'react';
import './Chat.css';


export const Chat = () => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const API_URL = 'http://localhost:4001'; // Change port if needed

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && message) {
            const newMessage = {
                time: new Date().toLocaleTimeString(),
                name,
                message,
            };

            // Send the new message to the server
            fetch(`${API_URL}/addMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newMessage),
            })
                .then(response => response.json())
                .then(savedMessage => {
                    // Update chat history with the saved message
                    setChatHistory([...chatHistory, savedMessage]);
                });

            setMessage('');
        }
    };

    useEffect(() => {
        // Fetch chat history from the server
        fetch(`${API_URL}/getChatHistory`)
            .then(response => response.json())
            .then(data => {
                setChatHistory(data);
            });
    }, []);

    return (
        <div className="App">
            <h1>Simple Web Chat</h1>
            <div className="chat-container">
                <div className="chat-history">
                    {chatHistory.map((msg, index) => (
                        <div key={index} className="chat-message">
                            <p className="message-time">{msg.time}</p>
                            <p className="message-sender">{msg.name}</p>
                            <p className="message-text">{msg.message}</p>
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSubmit} className="message-form">
                    <input
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Your message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    );
};
