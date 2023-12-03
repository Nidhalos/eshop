const expressJwt = require('express-jwt');
require('dotenv/config')

const secret = process.env.secret;
const api = process.env.API_URL;

const middleware = expressJwt({
    secret,
    algorithms: ['HS256']
}).unless({
    path: [
        `${api}/users/login`,
        `${api}/users/register`,
    ]
});

module.exports = middleware;
