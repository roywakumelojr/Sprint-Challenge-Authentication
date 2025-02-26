const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../users/users-model.js");
const { validateUser } = require("../users/users-helpers");

router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
  const validateResult = validateUser(user);

  if (validateResult.isSuccessful === true) {
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    Users.add(user)
      .then(saved => {
        res.status(200).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  } else {
    res.status(400).json({
      message: "Invalid information about the user, see errors for details",
      errors: validateResult.errors
    });
  }

});

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body;

  Users.findBy({ username })
  .first()
  .then(user => {
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = getJwtToken(user.username);

      res.status(200).json({
        message: `Welcome ${user.username}! have a token...`,
        token
      });
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  })
  .catch(error => {
    res.status(500).json(error);
  });

});

function getJwtToken(username) {
  const payload = {
    username,
  };

  const secret = process.env.JWT_SECRET || "is it secret, is it safe?";

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
