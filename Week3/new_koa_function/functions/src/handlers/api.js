const Koa = require("koa");
const routes = require("../routes/routes");

const app = new Koa();
app.use(routes.allowedMethods());
app.use(routes.routes());
module.exports = app;
