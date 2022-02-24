import { NextApiRequest, NextApiResponse } from "next";
import httpProxyMiddleware from "next-http-proxy-middleware";

export const config = {
  api: {
    bodyParser: false,
  },
};

const isDevelopment = process.env.NODE_ENV === "development" ? true : false;

export default (req: NextApiRequest, res: NextApiResponse) => {
  isDevelopment
    ? httpProxyMiddleware(req, res, {
        target: "http://localhost:8888",
        changeOrigin: true,
        pathRewrite: [
          {
            patternStr: "^/api/proxy/delete",
            replaceStr: "/ik_api/src/delete.php",
          },
          {
            patternStr: "^/api/proxy/cellarToFrontPatch",
            replaceStr: "/ik_api/src/cellarToFront.php",
          },
          {
            patternStr: "^/api/proxy/frontToCellarPatch",
            replaceStr: "/ik_api/src/frontToCellar.php",
          },
          {
            patternStr: "^/api/proxy/emptyBottlePatch",
            replaceStr: "/ik_api/src/onEmptyBottle.php",
          },
          {
            patternStr: "^/api/proxy/onOrderPatch",
            replaceStr: "/ik_api/src/onOrder.php",
          },
          {
            patternStr: "^/api/proxy/offOrderPatch",
            replaceStr: "/ik_api/src/offOrder.php",
          },
        ],
      })
    : // 後にproductionの方を実装
      res.status(404).send(null);

  // return proxy;
};
