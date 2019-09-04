const jwt = require('express-jwt');
const jwksClient = require('jwks-rsa');

exports.authJWT = jwt({
    secret: jwksClient.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://nextpizzeria.auth0.com/.well-known/jwks.json'
    }),
    audience: `${process.env.CLIENT_ID}`,
    issuer: 'https://nextpizzeria.auth0.com/',
    algorithms: ['RS256']
})