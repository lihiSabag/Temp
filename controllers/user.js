const bcrypt = require("bcrypt"); //Password encryption
const jwt = require("jsonwebtoken");
const User = require("../model/user");

const jwtKey = "my_secret_key"
const jwtExpirySeconds = 300

module.exports = {
  signup: (req, res, next) => {
    var connected = "false";
    var fullName = req.body.fullName;
    var email = req.body.email;
    var password = req.body.password;
    var status = "false";

    //checks if the email already exists in the databases
    User.find({ email }).then((users) => {
      if (users.length >= 1) {
        return res.render("pages/signUp", {
          status: status,
          connected: connected,
        });
      }

      //Password encryption
      bcrypt.hash(password, 10, (error, hash) => {
        if (error) {
          return res.status(500).json({
            error,
          });
        }
        const user = new User({
          fullName,
          email,
          password: hash,
        });
        user
          .save()
          .then((result) => {
            console.log("new user created");
            return res.redirect("/wellcomePage");
          })
          .catch((error) => {
            res.status(500).json({
              error,
            });
            console.log("post error ");
          });
      });
    });
  },

  login: (req, res) => {
    const { email, password } = req.body;
    var loginStatus = "false";
    var connected = "false";
    User.find({ email }).then((users) => {
      //If the user list is empty
      if (users.length === 0) {
        return res.render("pages/login", {
          loginStatus: loginStatus,
          connected: connected,
        });
      }

      const [user] = users;
      //Checking the password
      bcrypt.compare(password, user.password, (error, result) => {
        if (error) {
          return res.render("pages/login", {
            loginStatus: loginStatus,
            connected: connected,
          });
        }

        if (result) {
          const token = jwt.sign(
            {
              id: user._id,
              email: user.email,
            },
            jwtKey,
            {
              algorithm: "HS256",
              //For how long the user can stay connected
              expiresIn: "1H", //1 hour
            }
          );
     
          // set the cookie as the token string, with a similar max age as the token
          // here, the max age is in milliseconds, so we multiply by 1000
          res.cookie("token", token, { maxAge: jwtExpirySeconds * 1000 });
          res.end();
          res.cookie('token', token, { maxAge: 300 * 1000 });
          res.end();
          console.log(token);
          console.log("Auth successful");
          return res.redirect("/wellcomePage");
        }
        //If the password is incorrect
        return res.render("pages/login", {
          loginStatus: loginStatus,
          connected: connected,
        });
      });
    });
  },
  welcome: (req, res) => {
    // We can obtain the session token from the requests cookies, which come with every request
    const token = req.cookies.token;
  
    // if the cookie is not set, return an unauthorized error
    if (!token) {
      return res.status(401).end();
    }
  
    var payload;
    try {
      // Parse the JWT string and store the result in `payload`.
      // Note that we are passing the key in this method as well. This method will throw an error
      // if the token is invalid (if it has expired according to the expiry time we set on sign in),
      // or if the signature does not match
      payload = jwt.verify(token, jwtKey);
    } catch (e) {
      if (e instanceof jwt.JsonWebTokenError) {
        // if the error thrown is because the JWT is unauthorized, return a 401 error
        return res.status(401).end();
      }
      // otherwise, return a bad request error
      return res.status(400).end();
    }
  
    // Finally, return the welcome message to the user, along with their
    // username given in the token
    res.send(`Welcome ${payload.username}!`);
  }
};
