import { NextFunction, Request, Response } from "express";
import { compare, hash } from "bcrypt";
import User from "../models/User.model";
import ResponseController from "./ResponseController";
import DbOperation from "../db/utils";
import { CookieHandler } from "../utils/cookies";

/**
 * Controller class for user authentication related operations.
 */
class UserAuthController {
  /**
   * Creates a new user with email authentication method.
   *
   * @param req - The request object.
   * @param res - The response object.
   * @returns A success response with the created user data or a 500 error response.
   */
  public static Register = async (req: Request, res: Response) => {
    try {
      const { firstname, lastname, mobile, email, password } = req.body;
      const existingUser = await DbOperation.getUsersByEmail(email)
      if (existingUser) {
        return ResponseController.HandleResponseError(res, {
          status: 409,
          message: "User already exists!",
          errors: [],
        });
      }
      const hashedPassword = await hash(password, 10);
      const newUser = new User({
        firstname,
        lastname,
        mobile,
        email,
        password: hashedPassword,
      });
      console.log(newUser);
      await newUser.save();

      // Register cookies
      CookieHandler.registerCookies(res, newUser._id.toString());

      return ResponseController.HandleSuccessResponse(res, {
        status: 201,
        message: "Account created successfully!",
        data: newUser,
      });
    } catch (error) {
      return ResponseController.Handle500Error(res, error);
    }
  };

  /**
   * Logs in a user with email authentication method.
   *
   * @param req - The request object.
   * @param res - The response object.
   * @returns A Promise that resolves to the response object or rejects with an error response.
   */
  public static Login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const userAuth = await User.findOne({ email: email });

      // Check if user exists
      if (!userAuth) {
        return ResponseController.HandleResponseError(res, {
          status: 404,
          message: "User not found, Please create an account!",
          errors: [],
        });
      }

      const isPasswordValid = await compare(password, userAuth.password);

      // Check if password is valid
      if (!isPasswordValid) {
        return ResponseController.HandleResponseError(res, {
          status: 401,
          message: "Invalid credentials!",
          errors: [],
        });
      }

      //   // Register cookies
      CookieHandler.registerCookies(res, userAuth._id.toString());
      //return user data
      const user = await User.findById(userAuth._id);
      const { password: hashedPassword, ...rest } = user.toObject();
      return ResponseController.HandleSuccessResponse(res, {
        status: 200,
        message: "Login successful!",
        data: rest,
      });
    } catch (error) {
      return ResponseController.Handle500Error(res, error);
    }
  };

  public static verifyUser = async (req: Request, res: Response) => {
    try {
      // Check if user exists
      // res.locals.jwtData.id is the user id from the jwt token returned by the auth middleware called verifyToken
      const user = await User.findById(res.locals.jwtData.id);
      if (!user) {
        return ResponseController.HandleResponseError(res, {
          status: 404,
          message: "User not found!",
          errors: [],
        });
      }

      return ResponseController.HandleSuccessResponse(res, {
        status: 200,
        message: "User verified!",
        data: user,
      });
    } catch (error) {
      return ResponseController.Handle500Error(res, error);
    }
  };
  /**
   * Logout user.
   * @param req - The request object.
   * @param res - The response object.
   * @returns A success response with status 200 and an empty data object.
   */
  public static logout = async (req: Request, res: Response) => {
    try {
      //logout user
      CookieHandler.clearCookies(res);
      return ResponseController.HandleSuccessResponse(res, {
        status: 200,
        message: "Logout successful!",
        data: {},
      });
    } catch (error) {
      return ResponseController.Handle500Error(res, error);
    }
  };
}
export default UserAuthController;
