import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getPreviewBranchesFromGithub } from "../../../src/github";

const handler: NextApiHandler = async (req, res) => {
  if (req.query.token !== process.env.PREVIEW_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  switch (req.method) {
    case "GET":
      return await enablePreviewMode(req, res);
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
};

async function enablePreviewMode(req: NextApiRequest, res: NextApiResponse) {
  const { branch } = req.query;

  if (!branch || typeof branch !== "string") {
    return res.status(400).json({ message: "Branch query parameter required" });
  }

  const branches = await getPreviewBranchesFromGithub();

  if (!branches.includes(branch)) {
    return res.status(404).json({
      message: `The requested preview branch ${branch} does not exist`,
    });
  }

  res.setPreviewData({ branch: branch });
  res.redirect("/");
}

export default handler;
