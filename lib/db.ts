import mongoose, { Connection } from "mongoose";

let isConnected:Connection|boolean = false;
const connectDb = async () => {
  if (isConnected) {
    console.log("MONGO already connected");
    
    return isConnected;
  }
  try {
    const res = await mongoose.connect(process.env.MONGO_URI!);
    isConnected = res.connection;
    console.log("Mongo connected");
    
    return isConnected;
  } catch (error) {
    console.log(error);
  }
};

export default connectDb;