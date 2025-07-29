//This middleware protects routes by checking for a valid JWT token in the request headers.

const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyToken(req,res,next) {
    const header = req.headers.authorization; // get the header of auth ( Bearer <token> )

    if (!header || !header.startsWith('Bearer ')) {  // if header is mising or not start with Bearer 
        return res.status(401).send('No token provided');
    }

    const token = header.split(' ')[1]; // put the header into two parts ['Bearer' , 'toekn']and get the token saven into token variable
 
    try {
        const decoded = jwt.verify(token , process.env.JWT_SECRET); // check if the token is valid and not expired
        req.user = decoded; //then put the data into req.body
        next(); // and go to next step which is controller
    } catch (error) {
        return res.status(401).send('Invalid or expired token');
    }
}

module.exports = verifyToken;