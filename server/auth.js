var jwt = require('jsonwebtoken');

const config = {secret : 'azertyuiopmlkjhgfdsqwxcvbn', database: 'postgres://qftioduv:ZPRMRqRgl8yZxdtayEILGwqnP7pUGrDE@fizzy-cherry.db.elephantsql.com:5432/qftioduv'};

module.exports = {

    verifyToken: ( (req, res, next) => {
        console.log('auth', req.headers['x-access-token']);
        let token = req.body.token || req.query.token || req.headers['x-access-token'];
        console.log('token decoded', jwt.decode(token));

        if( token ) {

            jwt.verify(token, config.secret, (err, decoded) => {
   
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });    
                } else {
                    // all good, continue
                    req.decoded = decoded; 
                    next();
                }
            });

        }  else {

            res.send({ success: false, message: 'No token exists.' });
            
        }
    })

}