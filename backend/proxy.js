// backend/server.js

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const querystring = require('querystring');
const app = express();

const client_id = 'a13bd92348f34ca89a81e423bd115420'; // Your Spotify Client ID
const client_secret = '0b249c925daa4879a4910c9e2a3384f5'; // Your Spotify Client Secret
const redirect_uri = 'http://localhost:8889/callback'; // Your redirect URI

app.use(cors());

var generateRandomString = function (length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };
    
app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  var scope = 'user-read-private user-read-email user-library-read user-top-read playlist-read-private playlist-read-collaborative';

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

app.get('/callback', async function(req, res) {
    const code = req.query.code || null;
    const authOptions = {
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: querystring.stringify({
            code: code,
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code'
        }),
        headers: {
            'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    try {
        const response = await axios(authOptions);
        const { access_token } = response.data;
        res.redirect('http://localhost:3000/#' + querystring.stringify({ access_token }));
    } catch (error) {
        console.error('Error getting tokens:', error);
        res.redirect('/#' + querystring.stringify({ error: 'invalid_token' }));
    }
});

// Server-side token refresh route
app.get('/refresh_token', async function(req, res) {
    const refresh_token = req.query.refresh_token;
    const authOptions = {
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: querystring.stringify({
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        }),
        headers: {
            'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    try {
        const response = await axios(authOptions);
        res.send(response.data);
    } catch (error) {
        console.error('Error refreshing token:', error);
        res.status(500).send('Failed to refresh token');
    }
});

app.listen(8889, () => {
    console.log('Listening on 8889');
});