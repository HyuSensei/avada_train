const Router = require("koa-router");
const router = new Router();
const productHandler = require("../handler/productHandler");
const productMiddleware = require("../middleware/productInputMiddleware");

// Product routes
router.post(
  "/api/products",
  productMiddleware.createProduct,
  productHandler.createProduct
);
router.get("/api/products", productHandler.getAllProduct);
router.get("/api/products/:id", productHandler.getProductDetail);
router.put(
  "/api/products/:id",
  productMiddleware.updateProduct,
  productHandler.updateProduct
);
router.delete("/api/products/:id", productHandler.deleteProduct);

module.exports = router;
