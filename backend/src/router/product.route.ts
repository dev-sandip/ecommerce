import { Router } from "express";
import ProductController from "../controllers/productController";
const productRouter = Router();

productRouter.get("/:id", ProductController.getProduct);
productRouter.get("/all", ProductController.getallProducts);
productRouter.post("/", ProductController.createProduct);

export default productRouter;
