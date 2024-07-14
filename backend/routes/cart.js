const router = require("express").Router()
const User = require("../models/user")
const {authenticateToken} = require("../routes/userAuth")

 //API:=>
    //put book to cart

 router.put("/addToCart", authenticateToken, async (req,res) => {

    try {
        const {bookid , id} = req.headers;

        const userData = await User.findById(id);

        const isBookInCart = userData.cart.includes(bookid);

        if(isBookInCart) {
            return res.status(200).json({message: "Book already in cart present"})
        }
        await User.findByIdAndUpdate(id, {
            $push: {cart:bookid}
        });
        return res.status(200).json({
            status:"Success",
            message:"Book added to cart"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"SOme error occured"})
    }
 })

 //remove form cart

 router.delete("/deleteFromCart", authenticateToken, async(req,res) => {
   try {
    const {id } = req.params;
    const {bookid} = req.headers;
    await User.findByIdAndUpdate(id, {
        $pull:{cart:bookid}
    })
    return res.status(200).json({
        status:"Success",
        message:"Book removed from cart"
    })
   } catch (error) {
    console.log(error)
    return res.status(500).json({message:"SOme error occured"})
   }

 })

 //get a cart of a particular user

 router.get("/getUserCart", authenticateToken, async(req,res) => {
    try {
        
        const {id} = req.headers;
        const userData = await User.findById(id).populate("cart")
        const cart = userData.cart.reverse()

        return res.json({
            status:"Success",
            data:"cart"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Some error occured"})
    }
 })

 //update order --admin

 router.put("updateStatus/:id", authenticateToken, async(req,res) => {
    try {
        const {id} = req.params; // ye order id aa rhi hai 
        await order.findByIdAndUpdate(id, {status:req.body.status})
        return res.json({
            status:"Success",
            message:"Status Updated Sucessfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "An error ocurred"})
    }
 })

module.exports = router;