import mongoose from "mongoose"

export const connectMongodb = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGO_URI}${process.env.DB_NAME}`);
        console.log(`Connected to database ${connection.connection.host}`)
    } catch (error) {
        console.log(`Error connecting to database ${error.message}`);
        process.exit(1);
    }
}