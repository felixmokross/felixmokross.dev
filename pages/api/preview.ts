import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  if (req.query.token !== process.env.PREVIEW_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  res.setPreviewData({});
  res.redirect("/");
};

export default handler;
