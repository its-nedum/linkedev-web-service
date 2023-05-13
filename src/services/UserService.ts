import { IUser, IAuth } from "../interfaces/UserInterface";
import Users from "../models/Users";
import { BadRequestError } from "../error_handlers/errormessages";
import bcrypt from "../utils/bcrypt";
import jwt from "../utils/jwt";


export default {
    findAll: async () => {
        try {
            const users = await Users.find({ status: 1 }).select("-password").exec();
            return users;
        } catch (error) {
            throw new BadRequestError("Error finding users");
        }
    },
    findOne: async (id: string) => {
        try {
            const user = await Users.findById(id).select("-password").exec();
            return user;
        } catch (error) {
            throw new BadRequestError("Error finding user");
        }
    },
    update: async (id: string, userData: IUser) => {
        try {
            await Users.findByIdAndUpdate(id, userData);
            const user = await Users.findById(id).select("-password").exec();
            return user;
        } catch (error) {
            throw new BadRequestError("Error updating user profile");
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
        } catch (error) {
            throw new BadRequestError("Error removing user profile");
        }
    },
    findByEmail: async (email: string) => {
        try {
            const user = await Users.findOne({ email });
            return user;
        } catch (error) {
            throw new BadRequestError("Error finding user");
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
            }
            const user = await Users.create(data);

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
        } catch (error) {
            throw new BadRequestError("Error creating user");
        }
    },
}