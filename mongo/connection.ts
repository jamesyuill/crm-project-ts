import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://jamesyuill:5Fple8DdmdLWtOU7@crm-project-db.agnfnoq.mongodb.net/'
    );
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.log('Connection failed', error);
  }
};

export default connectDB;
