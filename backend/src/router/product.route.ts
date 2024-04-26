import { Router } from "express";
import ProductController from "../controllers/productController";
import isAdmin from "../middlewares/adminMiddleware";
import { verifyToken } from "../utils/token-manager";
const productRouter = Router();

productRouter.get("/:id", ProductController.getProduct);
productRouter.put(
  "/:id",
  isAdmin,
  verifyToken,
  ProductController.updateProduct
);
productRouter.delete(
  "/:id",
  isAdmin,
  verifyToken,
  ProductController.deleteProduct
);
productRouter.get("/", ProductController.getAllProducts);
productRouter.post("/", isAdmin, verifyToken, ProductController.createProduct);

export default productRouter;
