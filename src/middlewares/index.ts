import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../error_handlers/errormessages";
import { apiResponseFormat } from "../utils/formatresponse";
import UserService from "../services/UserService";
import jwt from "jsonwebtoken";
import { DataStoredInToken } from "../interfaces/UserInterface";

export default {
    validateToken: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const authorization = req.headers.authorization;
            
            if(!authorization){
                return res.status(401)
                    .send(apiResponseFormat(
                       401,
                       false,
                       "Authentication error, Token is required" 
                    ));
            }

            const token = req.headers.authorization?.split(" ")[1]!;
            
            const options = {
                expiresIn: process.env.JWT_EXPIRY as string,
                issuer: ""
            };
            const JWT_SECRET = process.env.JWT_SECRET as string;
            const decoded = jwt.verify(token, JWT_SECRET, options) as DataStoredInToken;
            const { email } = decoded;

            const user = await UserService.findByEmail(email);
            
            if(!user){
                throw new BadRequestError("Invalid token.");     
            }

            req.user = decoded;
            next();
        } catch (error) {
            if(error instanceof Error) {
                if (error.name === "TokenExpiredError") {
                    return res
                        .status(401)
                        .send(
                            apiResponseFormat(
                                401,
                                false,
                                "Token expired, refresh token and try again"
                            )
                        );
                }

                if (error.name === "JsonWebTokenError") {
                    return res
                        .status(401)
                        .send(
                            apiResponseFormat(
                                401,
                                false,
                                "Invalid token provided, check token and try again"
                            )
                        );
                }
            }

            res.status(500).send(apiResponseFormat(500, false, error));
        }
    },
}