import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  if (req.query.token !== process.env.PREVIEW_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  if (!req.query.branch || typeof req.query.branch !== "string") {
    return res.status(400).json({ message: "branch query parameter required" });
  }

  res.setPreviewData({
    branch: req.query.branch,
  });
  res.redirect("/");
};

export default handler;
