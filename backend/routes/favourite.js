const router = require("express").Router()
const User = require("../models/user")
const {authenticateToken} = require("../routes/userAuth")

//These api are used in case of a logged in user
//bookid : usedforbook
//id:Used for user

//API:=>

//Add book to favourites

router.put("/addBookToFavourite", authenticateToken, async(req,res)=> {

   try {
    const {id,bookid} = req.headers
    const userData = await User.findById(id);
    const isBookFavourite = userData.favourites.includes(bookid)

    if(isBookFavourite) {
        return res.status(200).json({message:"Book already in favourite"})
    }
    await User.findByIdAndUpdate(id, {$push:{favourites:bookid}})
    return res.status(200).json({message:"Book Added in favourite"})

   } catch (error) {
    return res.status(500).json({message:"Error occured"})
   }

})

//delete book from favourite

router.put("/deleteBookFavourite", authenticateToken, async(req,res)=> {

    try {
     const {id,bookid} = req.headers
     const userData = await User.findById(id);
     const isBookFavourite = userData.favourites.includes(bookid)
 
     if(isBookFavourite) {
        await User.findByIdAndUpdate(id, {$push:{favourites:bookid}})
     }
   
     return res.status(200).json({message:"Book Removed from favourite"})
     
    } catch (error) {
     return res.status(500).json({message:"Error occured"})
    }
 
 })

 //get favourite books of a particular user
 router.get("/getFavouriteBooks", authenticateToken, async(req,res) => {
    try {
        const {id} = req.headers
        const userData = await User.findById(id).populate("favourites")
        const favouriteBooks = userData.favourites;
        return res.json({
            data:favouriteBooks,
            status:"Success"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Error occured"})
    }
 })

module.exports = router