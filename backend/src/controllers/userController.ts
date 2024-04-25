import { NextFunction, Request, Response } from "express";
import { compare, hash } from "bcrypt";
import User from "../models/User.model";
import ResponseController from "./ResponseController";
import DbOperation from "../db/utils";
import { CookieHandler } from "../utils/cookies";


class UserController {

    public static getAllUsers = async (req: Request, res: Response) => {
        try {
            const users = await DbOperation.getAllUsers();
            return ResponseController.HandleSuccessResponse(res, {
                status: 200,
                message: "Users retrieved successfully!",
                data: users,
            });
        } catch (error) {
            return ResponseController.Handle500Error(res, error);
        }
    }
    public static getUserById = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const user = await User.findById(id);
            if (!user) {
                return ResponseController.HandleResponseError(res, {
                    status: 404,
                    message: "User not found!",
                    errors: [],
                });
            }
            return ResponseController.HandleSuccessResponse(res, {
                status: 200,
                message: "User retrieved successfully!",
                data: user,
            });
        } catch (error) {
            return ResponseController.Handle500Error(res, error);
        }
    }

    public static updateUser = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const updatedUser = await User.findByIdAndUpdate(id, {
                firstname: req?.body?.firstname,
                lastname: req?.body?.lastname,
                mobile: req?.body?.mobile,
                email: req?.body?.email
            }, {
                new: true
            })
            if (!updatedUser) {
                return ResponseController.HandleResponseError(res, {
                    status: 404,
                    message: "User not found!",
                    errors: [],
                });
            }
            return ResponseController.HandleSuccessResponse(res, {
                status: 200,
                message: "User updated successfully!",
                data: updatedUser,
            });
        } catch (error) {
            return ResponseController.Handle500Error(res, error);
        }
    }


    public static deleteUser = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const user = await User.findByIdAndDelete(id);
            if (!user) {
                return ResponseController.HandleResponseError(res, {
                    status: 404,
                    message: "User not found!",
                    errors: [],
                });
            }
            return ResponseController.HandleSuccessResponse(res, {
                status: 200,
                message: "User deleted successfully!",
                data: user,
            });
        } catch (error) {
            return ResponseController.Handle500Error(res, error);
        }
    }

}
export default UserController;