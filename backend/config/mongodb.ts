import mongoose from "mongoose";

mongoose.set("strictQuery", true);

const connection = async (): Promise<void> => {
  try {
    const response = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(
      `MongoDB connected: ${response.connection.host}`
    );
  } catch (error) {
    console.error(error);
  }
};

export default connection;