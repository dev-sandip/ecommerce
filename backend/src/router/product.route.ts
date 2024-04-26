import { Router } from "express";
import ProductController from "../controllers/productController";
const productRouter = Router();

productRouter.get("/", ProductController.getProducts);

export default productRouter;
