const Router = require("koa-router");
const bookHandler = require("../handlers/books/bookHandlers");
const productHandle = require("../handlers/products/productHandler");
const todoHandler = require("../handlers/todos/todoHandler");
const bookInputMiddleware = require("../middleware/bookInputMiddleware");
const middlewareProduct = require("../middleware/productInputMiddleware");
const api = require("../api/fetch");
// Prefix all routes with /books
const router = new Router();

// Routes will go here
router.get("/api/books", bookHandler.getBooks);
router.get("/api/books/:id", bookHandler.getBook);
router.post("/api/books", bookInputMiddleware, bookHandler.save);

// Product
router.get("/api/products", productHandle.getProducts);
router.get("/api/products/:id", productHandle.getProductDetail);
router.post("/api/products", middlewareProduct.productAdd, productHandle.save);
router.put(
  "/api/products/:id",
  middlewareProduct.productUpdate,
  productHandle.update
);
router.delete("/api/products/:id", productHandle.destroy);

//Todo
router.get("/api/todos", todoHandler.getAll);
router.post("/api/todos", todoHandler.createTodo);
router.put("/api/todos", todoHandler.updateTodoSeleted);
router.put("/api/todos/:id", todoHandler.updateTodo);
router.delete("/api/todos/:id", todoHandler.deleteTodo);
router.post("/api/todos/delete", todoHandler.deleteTodoSeleted);

module.exports = router;
