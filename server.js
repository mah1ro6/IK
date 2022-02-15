const express = require("express");
const next = require("next");
const { createProxyMiddleware } = require("http-proxy-middleware");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const pro = process.env.NODE_ENV !== "development";
const API_URL = process.env.API_URL || "http://localhost:8888";

const app = dev ? next({ dev }) : pro ? next({ pro }) : undefined;

const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(
      "/api",
      createProxyMiddleware({
        target: API_URL,
        pathRewrite: {
          "^/api/delete": "/ik_api/src/delete.php",
          "^/api/cellarPatch": "/ik_api/src/cellarToFront.php",
          "^/api/orderPatch": "/ik_api/src/onOrder.php",
        },
        changeOrigin: true,
      })
    );

    server.all("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
    });
  })
  .catch((err) => {
    console.log("エラーが発生しました", err);
  });

