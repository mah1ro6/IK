import { NextApiRequest, NextApiResponse } from "next";
import httpProxyMiddleware from "next-http-proxy-middleware";

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

const isDevelopment = process.env.NODE_ENV !== "production";

const postRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  isDevelopment
    ? await httpProxyMiddleware(req, res, {
        target: process.env.DEV_API_URL,
        changeOrigin: true,
        pathRewrite: [
          {
            patternStr: "^/api/proxy/delete",
            replaceStr: "/ik_request/api/delete.php",
          },
          {
            patternStr: "^/api/proxy/addToFrontPost",
            replaceStr: "/ik_request/api/addToFront.php",
          },
          {
            patternStr: "^/api/proxy/frontBottlePost",
            replaceStr: "/ik_request/api/reduceFrontBottle.php",
          },
          {
            patternStr: "^/api/proxy/onOrderPost",
            replaceStr: "/ik_request/api/onOrder.php",
          },
          {
            patternStr: "^/api/proxy/offOrderPost",
            replaceStr: "/ik_request/api/offOrder.php",
          },
          {
            patternStr: "^/api/proxy/addToCellarPost",
            replaceStr: "/ik_request/api/addToCellar.php",
          },
          {
            patternStr: "^/api/proxy/setItemTextPost",
            replaceStr: "/ik_request/api/setItemText.php",
          },
        ],
      })
    : await httpProxyMiddleware(req, res, {
        target: process.env.PRO_API_URL,
        changeOrigin: true,
        pathRewrite: [
          {
            patternStr: "^/api/proxy/delete",
            replaceStr: "/ik_request/api/delete.php",
          },
          {
            patternStr: "^/api/proxy/addToFrontPost",
            replaceStr: "/ik_request/api/addToFront.php",
          },
          {
            patternStr: "^/api/proxy/frontBottlePost",
            replaceStr: "/ik_request/api/reduceFrontBottle.php",
          },
          {
            patternStr: "^/api/proxy/onOrderPost",
            replaceStr: "/ik_request/api/onOrder.php",
          },
          {
            patternStr: "^/api/proxy/offOrderPost",
            replaceStr: "/ik_request/api/offOrder.php",
          },
          {
            patternStr: "^/api/proxy/addToCellarPost",
            replaceStr: "/ik_request/api/addToCellar.php",
          },
          {
            patternStr: "^/api/proxy/setItemTextPost",
            replaceStr: "/ik_request/api/setItemText.php",
          },
        ],
      });
};
export default postRequest;
