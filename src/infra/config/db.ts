import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const URI = process.env.MONGO_URI
        await mongoose.connect(URI as string);
        console.log('Mongodb connected!')
    } catch (err) {
        console.error('Mongodb connection failed❌', err);
        process.exit()
    }
};

export default connectDb;