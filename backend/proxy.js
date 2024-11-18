// backend/server.js

const express = require('express');
const request = require('request');
const cors = require('cors');
const querystring = require('querystring');
const app = express();

const client_id = 'YOUR_CLIENT_ID';
const client_secret = 'YOUR_CLIENT_SECRET';
const redirect_uri = 'http://localhost:8889/callback';

app.use(cors());

app.get('/login', function(req, res) {
    const scope = 'user-read-private user-read-email';
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri
        }));
});

app.get('/callback', function(req, res) {
    const code = req.query.code || null;
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code: code,
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
        },
        json: true
    };

    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            const access_token = body.access_token;
            res.redirect('http://localhost:3000/#' +
                querystring.stringify({
                    access_token: access_token
                }));
        } else {
            res.redirect('/#' +
                querystring.stringify({
                    error: 'invalid_token'
                }));
        }
    });
});

app.listen(8889, () => {
    console.log('Listening on 8889');
});
