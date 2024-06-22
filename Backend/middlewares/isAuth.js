const jwt = require('jsonwebtoken');

const IsAuth = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  try {
    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }

    const decoded = jwt.verify(token, 'JWT_SECERET');  // Use environment variable for the secret key
    req.body.userId = decoded.userId;
    req.body.username = decoded.username;
    req.body.role = decoded.role;
    

    console.log("decodedRole: ", decoded.role);
    console.log("decoded: ", decoded);
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ message: "Invalid or expired token" });  // Send appropriate error response
  }
}

module.exports = IsAuth;
