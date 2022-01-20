// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  id: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ id: 'John Doe' })
}

// export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
//   if (req.method === "POST") {
//     const { body } = req.body;
//     console.log(body);
//     // res.status(202).json({ id: body });
//     res.status(200).send(body);
//     if (res.status(200)) {
//     }
//   } else {
//     res.status(405).end();
//   }
// }


// import { NextApiRequest, NextApiResponse } from "next";
// import httpProxyMiddleware from 'next-http-proxy-middleware'
// import https from 'https'

// export const config = {
//   api: {
//     bodyParser: false
//   },
// }

// export default (req: NextApiRequest, res: NextApiResponse): Promise<any> => {
//   const proxy = httpProxyMiddleware(req, res, {
//     target: "http://localhost:8888/ik_api/src/main.php",
//     changeOrigin: true,
//     pathRewrite: {
//       '^/api/wine': '',
//     },
//     agent:new https.Agent({
//       rejectUnauthorized: false
//     })
//   })

//   return proxy
// }