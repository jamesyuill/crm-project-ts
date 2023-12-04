import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.log('Connection failed', error);
  }
};

export default connectDB;
