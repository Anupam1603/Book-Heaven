const express  = require("express")
const router = express.Router()
const User = require("../models/user")
const bcrypt = require('bcryptjs')
const jwt  = require("jsonwebtoken")
const {authenticateToken} = require("../routes/userAuth")
router.post("/signup",async (req,res)=> {
    try {
        const {username , email , password, address} = req.body;

        if( username.length < 4) {
             return res.status(400)
                    .json({message: "Username length should be more than 3"})
        }

        //check if username already exist
       const existingUser = await User.findOne({username: username});

       if(existingUser) {
        return res.status(400)
                  .json({message : "Username already exist"})
       }

       const existingEmail = await User.findOne({email: email})
       if(existingEmail) {
        res.status(400).json({message:"email already exist in the database"})
       }

       if(password.length <6) {
        return res.status(400)
                  .json({message:"password should contain a minimum character of 6 digits"})
       }
      
        const hashedPassword = await bcrypt.hash(password,10)
       //if it passes all these checks then 

       const newUser = new User({
        username:username,
        email:email,
        password:hashedPassword,
        address:address
    
    })
    await newUser.save();
    res.status(200).json({message:"SignUp sucessfully"});




    } catch (error) {
       res.status(500).json({message:"Internal Server Error"});
    }
})

router.post("/signin", async (req,res)=> {
    try {
        const {username , password} = req.body;
       
        const existingUser = await User.findOne({username})
        if(!existingUser) {
            res.status(400).json({message:"Invalid Cred"});
        }
      await bcrypt.compare(password, existingUser.password,(err,data)=> {
        if(data) {
            const authClaims = [
                {name:existingUser.username},
                {role:existingUser.role}
            ]
            const token = jwt.sign({authClaims}, "bookStore234", {
                expiresIn:"30d",
            })
            res
            .status(200)
            .json({
                id: existingUser._id,
                role:existingUser.role,
                token:token 
            })
        }else {
            res.status(400).json({message:"Invalid Cred"});
        }
      })
    } catch (error) {
       res.status(500).json({message:"Internal server error"});
    }
})

//get-user-info

router.get("/getUserInfo",authenticateToken, async (req,res) => {
  try {
    const {id} = req.headers;
    const data = await User.findbyId(id).select('-password');
    return res.status(200).json(data)
  } catch (error) {
    res.status(500).json({message:"Internal server erro"})
  }
})

//update address
router.put("/updateAddress", authenticateToken, async (req,res) => {
        try {
            const {id} = req.headers;
            const {address} = req.body;
            await   User.findbyIdAndUpdate(id, {address:address})
            return res.status(200).json({message:"Address upadated sucessfully"})
        } catch (error) {
            res.status(500).json({message: "Internal server error"})
        }
})
module.exports = router;