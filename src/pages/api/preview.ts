import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { getBranchesFromGithub } from "../../shared/github.server";

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
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  if (session.login !== process.env.GITHUB_USERNAME) {
    return res.status(403).json({
      message: `The user ${session.login} does not have permission to access this resource.`,
    });
  }

  const { branch } = req.body as { branch: string };

  if (!branch || typeof branch !== "string") {
    return res.status(400).json({ message: "Branch query parameter required" });
  }

  const branches = await getBranchesFromGithub();

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
