import mongoose from 'mongoose';

const connectDB = async():Promise<void> => {
    try {
        const URL = process.env.MONGO_URL || 'mongodb://localhost:27017/mydatabase';
        const conn = await mongoose.connect(URL);
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}
export default connectDB;