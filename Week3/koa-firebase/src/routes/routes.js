const Router = require("koa-router");
const router = new Router();
const productHandler = require("../handler/productHandler");
const productMiddleware = require("../middleware/productInputMiddleware");
const todoHandler = require("../handler/todoHandler");

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

//Todo routes
router.get("/api/todos", todoHandler.getAllTodo);
router.post("/api/todos", todoHandler.createTodo);
router.put("/api/todos", todoHandler.updateSelectedTodo);
router.put("/api/todos/:id", todoHandler.updateTodo);
router.delete("/api/todos/:id", todoHandler.destroyTodo);
router.post("/api/todos/delete", todoHandler.deleteSelectedTodo);

module.exports = router;
