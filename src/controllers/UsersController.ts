import { NextFunction, Request, Response } from "express";
import UserService from "../services/UserService";
import bcrypt from "../utils/bcrypt";
import jwt from "../utils/jwt";
import { BadRequestError } from "../error_handlers";

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

            return res.status(200).send(profile);
        } catch (error) {
            next(error);
        }
    },

    findAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { _end: pageSize, _start: currentPage } = req.query;

            const users = await UserService.findAll(Number(pageSize), Number(currentPage));

            return res.status(200).send(users);
        } catch (error) {
            next(error);
        }
    },

    findOne: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const users = await UserService.findOne(id);

            return res.status(200).send(users);
        } catch (error) {
            next(error);
        }
    },
    
    destroy: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const users = await UserService.removeProfile(id);

            return res.status(200).send(users);
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

            return res.status(201).send(user);
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

            return res.status(200).send({
                user: {
                    _id: user._id,
                    email: user.email,
                    status: user.status,
                },
                token,
                expires_in
            })
        } catch (error) {
            next(error);
        }
    },
}
