const expressJwt = require('express-jwt');
console.log(expressJwt);

function auth() {
    try {
        const secret = process.env.secret;
        console.log(expressJwt);  // Log the expressJwt object
        return expressJwt({
            secret,
            algorithms: ['HS256']
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports = auth;

