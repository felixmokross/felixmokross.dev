import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getPreviewBranchesFromGithub } from "../../github.server";

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "PUT":
      return await enablePreviewMode(req, res);
    case "DELETE":
      return await disablePreviewMode(req, res);
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
};

async function enablePreviewMode(req: NextApiRequest, res: NextApiResponse) {
  const { branch, token } = req.body as { branch: string; token: string };

  if (token !== process.env.PREVIEW_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

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
  res.end();
}

async function disablePreviewMode(_: NextApiRequest, res: NextApiResponse) {
  res.clearPreviewData();
  res.end();
}

export default handler;
