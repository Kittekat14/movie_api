/** 
 * 
 * for already signed up users: Login Process +
 * Login Endpoint (will generate a JWT token for them) 
 * 
 */
const jwtSecret = 'your_jwt_secret';
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('./passport');

let generateJWTToken = (user) => {
   return jwt.sign(user, jwtSecret, {
     /** 
      * This is the Username youre encoding in the JWT 
      */
     subject: user.username,
     expiresIn: "7d",
     /** 
      * algorithm to “sign” or encode the values of the JWT 
      */
     algorithm: "HS256",
   });
}

 /** 
  * POST Login 
  * @method POST
  * @param endpoint to authenticate already registered users
  * @returns user object and token for that user
  */

 module.exports = (router) => {
   router.post('/login', (req, res) => {
     passport.authenticate('local', { session: false }, (error, user, info) => {
        if(error || !user) {
          return res.status(400).json({
            message: "False username or password!",
            user: user
          });
        }
        req.login(user, { session: false }, (error) => {
            if (error) {
              res.send(error);
            }
            let token = generateJWTToken(user.toJSON());
            return res.json({ user, token });
          });
        })(req, res);
   });
 }

