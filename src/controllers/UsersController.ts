import { NextFunction, Request, Response } from "express";
import UserService from "../services/UserService";
import { apiResponseFormat } from "../utils/formatresponse";
import bcrypt from "../utils/bcrypt";
import jwt from "../utils/jwt";
import { BadRequestError } from "../error_handlers/errormessages";


export default {
    profile: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {
                firstName,
                lastName,
                skills,
                yearsOfExperience,
                bio
            } = req.body;

            if(!firstName || !lastName || !skills || !yearsOfExperience || !bio){
                throw new BadRequestError("Missing some required fields");
            }

            const data = {
                ...req.body,
                status: 1,
            }

            const profile = await UserService.update(req.user.id, data);

            return res.status(200)
                .send(apiResponseFormat(
                    200,
                    profile,
                    "Profile created"
                ));
        } catch (error) {
            next(error);
        }
    },

    findAll: async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await UserService.findAll();

            return res.status(200)
                .send(apiResponseFormat(
                    200,
                    users,
                    "Users found"
                ));
        } catch (error) {
            next(error);
        }
    },

    findOne: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const users = await UserService.findOne(id);

            return res.status(200)
                .send(apiResponseFormat(
                    200,
                    users,
                    "User found"
                ));
        } catch (error) {
            next(error);
        }
    },
    
    destroy: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const users = await UserService.removeProfile(id);

            return res.status(200)
                .send(apiResponseFormat(
                    200,
                    users,
                    "User found"
                ));
        } catch (error) {
            next(error);
        }
    },

    register: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;

            if(!email || !password){
                throw new BadRequestError("Missing some required fields");
            }

            // check if user exist
            const userExist = await UserService.findByEmail(email);
            if(userExist){
                throw new BadRequestError("User already created")
            };

            const data = {
                email,
                password,
                status: 0,
            }

            const user = await UserService.register(data);

            return res.status(201)
                .send(apiResponseFormat(
                    201,
                    user,
                    "Account created"
                ));
        } catch (error) {
            next(error);
        }
    },

    login: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;

            if(!email || !password){
                throw new BadRequestError("Missing some required fields");
            }

            // check if user exist
            const user = await UserService.findByEmail(email);
            if(!user){
                throw new BadRequestError("Invalid email")
            };

            // validate user password
            if(!bcrypt.comparePassword(String(password), user.password!)){
                throw new BadRequestError("Invalid password")
            }
            
            const { token, expires_in } = jwt.generateToken({id: user._id, email})

            return res.status(200)
                .send(apiResponseFormat(
                    200,
                    {
                        user: {
                            _id: user._id,
                            email: user.email,
                            status: user.status,
                        },
                        token,
                        expires_in
                    },
                    "Login successful"
                ));
        } catch (error) {
            next(error);
        }
    },
}