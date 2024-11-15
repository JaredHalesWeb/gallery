// backend/proxy.js

const express = require('express');
const request = require('request');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/api/deezer/search', (req, res) => {
    const query = req.query.q;
    const index = req.query.index || 0;
    const limit = req.query.limit || 10;
    const deezerApiUrl = `https://api.deezer.com/search?q=${query}&index=${index}&limit=${limit}`;
    request(deezerApiUrl, (error, response, body) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.send(body);
    });
});

app.get('/api/deezer/chart', (req, res) => {
    const index = req.query.index || 0;
    const limit = req.query.limit || 10;
    const deezerApiUrl = `https://api.deezer.com/chart?index=${index}&limit=${limit}`;
    request(deezerApiUrl, (error, response, body) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.send(body);
    });
});

const PORT = 8889;
app.listen(PORT, () => {
    console.log(`Proxy server running on port ${PORT}`);
});
