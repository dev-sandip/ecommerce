import { Request, Response } from "express";
import User from "../models/User.model";
import ResponseController from "./ResponseController";
import DbOperation from "../db/utils";
import Utils from "../utils/utils";



class UserController {

    public static getAllUsers = async (req: Request, res: Response) => {
        try {
            const users = await DbOperation.getAllUsers();
            const newUsers = Utils.usersWithoutPassword(users);

            return ResponseController.HandleSuccessResponse(res, {
                status: 200,
                message: "Users retrieved successfully!",
                data: newUsers,
            });
        } catch (error) {
            return ResponseController.Handle500Error(res, error);
        }
    }
    public static getUserById = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const user = await User.findById(id);
            const userWithoutPassword = Utils.userWithoutPassword(user);
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
                data: userWithoutPassword,
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
            const userWithoutPassword = Utils.userWithoutPassword(updatedUser);
            return ResponseController.HandleSuccessResponse(res, {
                status: 200,
                message: "User updated successfully!",
                data: userWithoutPassword,
            });
        } catch (error) {
            return ResponseController.Handle500Error(res, error);
        }
    }


    public static deleteUser = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const user = await User.findByIdAndDelete(id);
            const userWithoutPassword = Utils.userWithoutPassword(user);
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
                data: userWithoutPassword,
            });
        } catch (error) {
            return ResponseController.Handle500Error(res, error);
        }
    }
    public static blockUser = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const blockedUser = await User.findByIdAndUpdate(id, {
                isBlocked: true
            }, {
                new: true
            })
            if (!blockedUser) {
                return ResponseController.HandleResponseError(res, {
                    status: 404,
                    message: "User not found!",
                    errors: [],
                });
            }
            const userWithoutPassword = Utils.userWithoutPassword(blockedUser);
            return ResponseController.HandleSuccessResponse(res, {
                status: 200,
                message: "User blocked successfully!",
                data: userWithoutPassword,
            });
        } catch (error) {
            return ResponseController.Handle500Error(res, error);
        }
    }
    public static unblockUser = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const blockedUser = await User.findByIdAndUpdate(id, {
                isBlocked: false
            }, {
                new: true
            })
            if (!blockedUser) {
                return ResponseController.HandleResponseError(res, {
                    status: 404,
                    message: "User not found!",
                    errors: [],
                });
            }
            const userWithoutPassword = Utils.userWithoutPassword(blockedUser);
            return ResponseController.HandleSuccessResponse(res, {
                status: 200,
                message: "User unblocked successfully!",
                data: userWithoutPassword,
            });
        } catch (error) {
            return ResponseController.Handle500Error(res, error);
        }
    }

}
export default UserController;