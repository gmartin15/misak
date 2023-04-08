const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const { createProxyMiddleware } = require("http-proxy-middleware");

app.set('view engine', 'pug');

var indexRouter = require("./routes/index");

app.use('/', indexRouter);

app.use(
  "/",
  createProxyMiddleware({
    changeOrigin: true,
    onProxyReq: function onProxyReq(proxyReq, req, res) {},
    pathRewrite: {
      "^/": "/",
    },
    target: "http://127.0.0.1:10800/",
    ws: true,
  })
);


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
