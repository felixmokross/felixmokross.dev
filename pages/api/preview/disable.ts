import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const handler: NextApiHandler = async (req, res) => {
  if (req.query.token !== process.env.PREVIEW_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  switch (req.method) {
    case "GET":
      return await disablePreviewMode(req, res);
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
};

async function disablePreviewMode(_: NextApiRequest, res: NextApiResponse) {
  res.clearPreviewData();
  res.redirect("/");
}

export default handler;
