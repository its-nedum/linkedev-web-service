import { IUser, IAuth } from "../interfaces/UserInterface";
import Users from "../models/Users";
import bcrypt from "../utils/bcrypt";
import jwt from "../utils/jwt";

export default {
    findAll: async (pageSize: number, currentPage: number) => {
        try {
            const page = currentPage < 1 ? 1 : currentPage;
            const skip = (page - 1) * pageSize;
            const users = await Users.find({ status: 1 })
                .select("-password")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(pageSize)
                .exec();
            return users;
        } catch (error: any) {
            throw new Error(error);
        }
    },
    findOne: async (id: string) => {
        try {
            const user = await Users.findById(id).select("-password").exec();
            return user;
        } catch (error: any) {
            throw new Error(error);
        }
    },
    update: async (id: string, userData: IUser) => {
        try {
            await Users.findByIdAndUpdate(id, userData);
            const user = await Users.findById(id).select("-password").exec();
            return user;
        } catch (error: any) {
            throw new Error(error);
        }
    },
    removeProfile: async (id: string) => {
        try {
            await Users.findByIdAndUpdate(id, {
                firstName: "",
                lastName: "",
                skills: "",
                yearsOfExperience: "",
                bio: "",
                status: 0,
            });
            const user = await Users.findById(id).select("-password").exec();
            return user;
        } catch (error: any) {
            throw new Error(error);
        }
    },
    findByEmail: async (email: string) => {
        try {
            const user = await Users.findOne({ email });
            return user;
        } catch (error: any) {
            throw new Error(error);
        }
    },
    register: async (credentials: IAuth) => {
        try {
            // hash user password
            const hash = bcrypt.password(credentials.password);
            const data = {
                email: credentials.email,
                password: hash,
                status: credentials.status,
            };

            const user = await Users.create(data);
            
            // generate auth token with user info
            const { token, expires_in } = jwt.generateToken({
                id: user._id,
                email: user.email,
            });

            return {
                user:{
                    _id: user._id,
                    email: user.email,
                    status: user.status,
                },
                token,
                expires_in,
            };
        } catch (error: any) {
            throw new Error(error);
        }
    },
}