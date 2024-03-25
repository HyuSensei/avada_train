const Koa = require("koa");
const { koaBody } = require("koa-body");
const routes = require("./routes/routes.js");
const { onRequest } = require("firebase-functions/v2/https");
const cors = require("koa-cors");

const app = new Koa();
// app.use(koaBody());
app.use(cors({ origin: "*", credentials: true }));
app.use(routes.routes());
app.use(routes.allowedMethods());
const handleRequest = (req, res) => {
  app.callback()(req, res);
};

// app.listen(5000);

exports.api = onRequest(handleRequest);
