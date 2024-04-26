import { Request, Response, NextFunction } from 'express';
import { ErrorResponseType } from '../types/response';
import jwt from "jsonwebtoken";
import ResponseController from '../controllers/ResponseController';
import UserModel from '../models/User.model';

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.signedCookies[process.env.AUTH_TOKEN_ID];

    if (!token || token.trim() === " ") {
        const response: ErrorResponseType = {
            status: 401,
            message: "Auth Error, Cookies not found",
            errors: [],
        };
        return res.status(response.status).json(response);
    }

    const data = jwt.verify(
        token,
        process.env.JWT_SECRET,
        (err: any, success: any) => {
            if (err) {
                return ResponseController.HandleResponseError(res, {
                    status: 401,
                    message: "Token Expired, Please login again!",
                    errors: [],
                });
            } else {
                res.locals.jwtData = success;
                return success;
            }
        }
    );

    const id = data.id.toString();
    try {
        const user = await UserModel.findById(id);
        if (user.isAdmin) {
            next();
        }
        else {
            return ResponseController.HandleResponseError(res, {
                status: 403,
                message: "You are not authorized to access this resource",
                errors: [],
            });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export default isAdmin;
