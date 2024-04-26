import { Request, Response } from "express";
import ProductModel from "../models/Product.model";
import ResponseController from "./ResponseController";
import Slugify from "slugify";

class ProductController {
  public static createProduct = async (req: Request, res: Response) => {
    try {
      if (req.body.title) {
        req.body.slug = Slugify(req.body.title, { lower: true });
      }
      const newProduct = await ProductModel.create(req.body);
      return ResponseController.HandleSuccessResponse(res, {
        status: 201,
        message: "Product created successfully!",
        data: newProduct,
      });
    } catch (error) {
      return ResponseController.Handle500Error(res, error);
    }
  };
  public static getAllProducts = async (req: Request, res: Response) => {
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

  public static getProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const product = await ProductModel.findById(id);
      return ResponseController.HandleSuccessResponse(res, {
        status: 200,
        message: "Product retrieved successfully!",
        data: product,
      });
    } catch (error) {
      return ResponseController.Handle500Error(res, error);
    }
  };
  public static updateProduct = async (req: Request, res: Response) => {
    try {
      if (req.body.title) {
        req.body.slug = Slugify(req.body.title, { lower: true });
      }
      const { id } = req.params;
      const updatedProduct = await ProductModel.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
        }
      );
      return ResponseController.HandleSuccessResponse(res, {
        status: 200,
        message: "Product updated successfully!",
        data: updatedProduct,
      });
    } catch (error) {
      return ResponseController.Handle500Error(res, error);
    }
  };
  public static deleteProduct = async (req: Request, res: Response) => {
    try {
      if (req.body.title) {
        req.body.slug = Slugify(req.body.title, { lower: true });
      }
      const { id } = req.params;
      const deletedProduct = await ProductModel.findByIdAndDelete(id);
      return ResponseController.HandleSuccessResponse(res, {
        status: 200,
        message: "Product deleted successfully!",
        data: deletedProduct,
      });
    } catch (error) {
      return ResponseController.Handle500Error(res, error);
    }
  };
}

export default ProductController;
