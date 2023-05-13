import mongoose from "mongoose";

export default {
    connectDatabase: async () => {
        const connectionString = process.env.MONGODB_URI as string;
        try {
           await mongoose.connect(connectionString)
           .then(() => console.log("[server]: Database connected!"))
           .catch((error) => console.log(error))
           
        } catch (error) {
            console.log(error);
            process.exit(1);
        }
    },
}