const userModel = require("../../model/user");
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken')

const userLogin = async (req, res, next) => {
    const { email, password } = req.body;

    // Log the received data for debugging
    console.log('Received data:', {  email, password});

    try {
      const user = await userModel.findOne({email});
      if(!user) return res.status(404).json({message:"User No Found"});

      const isMatch = await bcrypt.compare(password,user.password);
      if(!isMatch) return res.status(404).json({message:"Invalid Creadentials"});
      const token = jwt.sign({userId:user.id,username:user.username},"JWT_SECERET");

      res.status(201).json({message:"User login successfully",token})


    } catch (error) {
        console.error('Error:', error); // Debugging line
        next(error);
    }
};

module.exports = userLogin;