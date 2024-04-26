import { Request, Response } from "express";
import ProductModel from "../models/Product.model";
import ResponseController from "./ResponseController";

class ProductController {
  public static getProducts = async (req: Request, res: Response) => {
    try {
      const products = await ProductModel.find();
      return ResponseController.HandleSuccessResponse(res, {
        status: 200,
        message: "Products retrieved successfully!",
        data: products,
      });
    } catch (error) {
      return ResponseController.Handle500Error(res, error);
    }
  };
}

export default ProductController;
