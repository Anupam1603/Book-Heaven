const {authenticateToken} = require("./userAuth")
const Book = require("../models/book")
const Order = require("../models/order")
const User = require("../models/user");
const user = require("../models/user");
const router = require('express').Router();

//API :=>

//place order
router.post("/placeOrder", authenticateToken, async(req,res)=> {
    try {
        const {id} = req.headers;
        const {order} = req.body;

        for(const orderData of order) {
            const newOrder= new Order({user: id, book: orderData._id});
            const orderDataFromDb = await newOrder.save();

            //saving order in user model 
            await User.findByIdAndUpdate(id, {
                $push: {orders:orderDataFromDb._id}
            });

            //clearing the cart
            await User.findByIdAndUpdate(id, {
                $pull:{cart:orderData._id},
            });
        }
            return res.json({
                status:"Success",
                message:"Order Placed Sucessfully"
            })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "An error occured"})
    }
});


//get order history of a particular user
router.get("/getOrderHistory", authenticateToken, async (req,res)=> {
    try {
        const { id} = req.headers;
        const userData = await user.findById(id).populate({
            path:"orders",
            populate: {path: "book"},
        })

        const ordersData = userData.orders.reverse();
        return res.json({
            status:"Success",
            data:ordersData
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "An error occured"})
    }
})


//get all orders --admin

router.get("getAllOrders", authenticateToken, async(req,res) => {
    try {
        const userData = await Order.find()
           .populate({
            path:"book"
           })
           .populate({
            path:"user"
           })
           .sort({createdAt: -1})
        return res.json({
            status:"Success",
            data:userData,
        })   
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "An error occured"});
    }
})
module.exports = router;