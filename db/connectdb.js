const mongoose = require("mongoose");
const LiveUrl = "mongodb+srv://bhadoriyaanurag88:Anurag32@cluster0.ityj6az.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
   //  return mongoose.connect('mongodb://127.0.0.1:27017/coursebooking')
    return mongoose.connect(process.env.LIVE_URL)

     .then(() => {
      console.log("Database Connection Successful ");
     })
     .catch((error) => {
        console.log(error);
     });
};

module.exports = connectDB;
