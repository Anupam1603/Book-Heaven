const mongoose = require('mongoose')


const conn = async () => {
    try {
        mongoose.connect(`${process.env.MONGO_URI}`);
        console.log("Database connected");
    } catch (error) {
        console.log(message.error)
    }
}

conn();