const express  = require("express")
const router = express.Router()
const User = require("../models/user")
const jwt  = require("jsonwebtoken")
const { authenticateToken } = require("./userAuth")
const Book = require("../models/book")


//add book --admin
router.post("/addBook", authenticateToken, async (req,res)=> {
    try {
        const {id} = req.headers;
        const user = await User.findById(id);
        if(user.role !== "admin") {
          return  res.status(400).json({message:"Access denied"})
        }
        const book = new Book({
            title:req.body.title,
            url:req.body.url,
            author:req.body.author,
            desc:req.body.desc,
            price:req.body.price,
            language:req.body.language,

        })
        await book.save();
        res.status(200).json({message:"Book added sucessfully"})
    } catch (error) {
        res.status(200).json({message:"Internal server error"})
    }
})

//update book
router.put("/updateBook", authenticateToken,async (req,res) => {
    try {
        const {bookid }= req.headers;
        await Book.findByIdAndUpdate(bookid, {
            title:req.body.title,
            url:req.body.url,
            author:req.body.author,
            desc:req.body.desc,
            price:req.body.price,
            language:req.body.language,
        }) ;
        return res.status(200).json("Book updated sucessfully")

    } catch (error) {
        console.log(error);
        res.status(500).json("An error occured")
    }
})

//delete book --admin

router.delete("/deleteBook", authenticateToken, async(req,res)=> {
    try {
        const {bookid} =req.headers;
    await User.findByIdAndDelete(bookid);
    return res.status(200).json({
        message:"Book deleted sucessfully"
    })

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Some error occured"})
    }

})

//get books api

router.get("/getAllBooks", authenticateToken, async(req,res)=> {
   try {
    const books = await Book.find().sort({createdAt: -1})
    return res.json({
        data:books,
        status:"Success"
    })
   } catch (error) {
    console.log(error);
    res.status(500).json({message:"Some error occured"})
   }
})
/*{
 const books = await Book.find().sort({createdAt: -1}) : This line finds all the books then sorts it in a way such that recently created
                                                         book is at the top
}
*/

//get some recently added books limit 4 only api

router.get("/getRecentBooks", async (req,res)=> {
        try {
            const books = await Book.find().sort({createdAt:-1}).limit(4);
            return res.json({
                status:"Success",
                data:books
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"Internal server error"})
        }
})

//get a particular book by id

router.get("/bookById/:id", authenticateToken, async(req,res) => {
   try {
    const {id} = req.params;
    const book = await User.find(id);
    return res.json({
        data:book,
        status:"Success"
    })
   } catch (error) {
    console.log(error)
    res.status(500).json({message:"Error occured"})
   }
})
module.exports = router