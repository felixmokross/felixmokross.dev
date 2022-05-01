import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { basicAuth } from "../../src/util";

const handler: NextApiHandler = async (req, res) => {
  if (req.query.token !== process.env.PREVIEW_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  switch (req.method) {
    case "PUT":
      return await enablePreviewMode(req, res);
    case "DELETE":
      return await disablePreviewMode(req, res);
  }
};

async function enablePreviewMode(req: NextApiRequest, res: NextApiResponse) {
  const { branch } = req.query;

  if (!branch || typeof branch !== "string") {
    return res.status(400).json({ message: "branch query parameter required" });
  }

  const response = await fetch(
    `https://api.github.com/repos/${process.env.GITHUB_USERNAME}/${process.env.GITHUB_CONTENT_REPO}/branches`,
    {
      headers: {
        Authorization: basicAuth(
          process.env.GITHUB_USERNAME!,
          process.env.GITHUB_TOKEN!
        ),
      },
    }
  );

  if (response.status !== 200)
    throw new Error(`GitHub responded with ${response.status}`);

  const branches = (await response.json()) as { name: string }[];

  if (!branches.some((b) => b.name === branch)) {
    return res.status(404).json({
      message: `the requested preview branch ${branch} does not exist`,
    });
  }

  res.setPreviewData({ branch: branch });
  res.status(200).end();
}

async function disablePreviewMode(_: NextApiRequest, res: NextApiResponse) {
  res.clearPreviewData();
  res.status(200).end();
}

export default handler;
