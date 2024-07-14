const mongoose = require('mongoose')

const book = new mongoose.Schema({
  title: {
    type:String,
    required :true
  },
  url: {
    type:String,
    required :true
  },
  author: {
    type:String,
    required :true
  },
  desc: {
    type:String,
    required :true
  },
  price: {
    type:Number,
    required :true
  },
  language: {
    type:String,
    required :true
  },
},{timestamps:true})

module.exports = mongoose.model("books", book);