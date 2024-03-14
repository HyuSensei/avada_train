const Koa = require("koa");
const { koaBody } = require("koa-body");
const routes = require("./routes/routes.js");
const { onRequest } = require("firebase-functions/v2/https");
const connection = require("./firesrtore/connection");

const app = new Koa();
app.use(koaBody());
app.use(routes.routes());
app.use(routes.allowedMethods());

const handleRequest = (req, res) => {
  app.callback()(req, res);
};
connection();
app.listen(5000);
exports.api = onRequest(handleRequest);
