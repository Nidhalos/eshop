const expressJwt = require('express-jwt');
require('dotenv/config')

const secret = process.env.secret;
const api = process.env.API_URL;

const middleware = expressJwt({
    secret,
    algorithms: ['HS256']
}).unless({
    path: [
        {url: /\/public\/uploads(.*)/ , methods: ['GET', 'OPTIONS'] },
        {url: /\/api\/v1\/product(.*)/ , methods: ['GET', 'OPTIONS'] },
        {url: /\/api\/v1\/categories(.*)/ , methods: ['GET', 'OPTIONS'] },
        {url: /\/api\/v1\/orders(.*)/,methods: ['GET', 'OPTIONS', 'POST']},
        `${api}/users/login`,
        `${api}/users/register`,
    ]
});

module.exports = middleware;
