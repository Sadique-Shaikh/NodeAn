import mongoose from 'mongoose';

const DBConnection = async () => {
    const MONGODB_URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/employeeManagementSystem'; // Use the environment variable directly

    if (!MONGODB_URL) {
        console.error("MongoDB URI is not defined in the environment variables");
        return;
    }

    try {
        await mongoose.connect(MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Successfully connected to the database');
    }
    catch (error) {
        console.error("Error while connecting to the database: ", error.message);
    }
}

export default DBConnection;
