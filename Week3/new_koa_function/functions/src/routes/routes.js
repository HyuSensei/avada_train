const Router = require("koa-router");
const router = new Router();
const ProductController = require("../handlers/controllers/ProductController");
router.get("/api/hello", (ctx) => {
  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Hello world",
    error: [],
  };
});

// Product routes
router.post("/api/products", ProductController.createProduct);

module.exports = router;
