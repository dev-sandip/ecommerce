import { createRouter } from "@/libs/create-app";

import * as handlers from "./product.handler";
import * as routes from "./product.route";

const router = createRouter()
  .openapi(routes.createProductRoute, handlers.createProduct)
  .openapi(routes.listProductsRoute, handlers.listProducts);

export default router;
