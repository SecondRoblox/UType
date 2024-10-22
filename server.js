const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (HTML, CSS, etc.)
app.use(express.static('public'));

// Load quotes from a JSON file
const quotes = JSON.parse(fs.readFileSync('quotes.json', 'utf-8'));

// API endpoint to get a random quote
app.get('/api/quote', (req, res) => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    res.json(randomQuote);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
