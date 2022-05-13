import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useState } from "react";
import { getPreviewBranchesFromGithub } from "../github";
import { Layout } from "../layout";
import { CommonPageProps, getCommonPageProps, PreviewData } from "../util";

export default function AdminPage({ branches, layoutProps }: AdminPageProps) {
  const [branch, setBranch] = useState(branches[0] || "");
  const [token, setToken] = useState("");
  const router = useRouter();

  return (
    <Layout
      {...layoutProps}
      pageHeadProps={{
        title: "Admin",
        path: "/admin",
        description: "Blog admin page",
      }}
    >
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form
            className="space-y-6"
            onSubmit={async (e) => {
              e.preventDefault();
              const response = await fetch("/api/preview", {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ token, branch }),
              });

              if (response.status !== 200)
                throw new Error(`Message: ${(await response.json()).message}`);

              router.push("/");
            }}
          >
            <div>
              <label
                htmlFor="branch"
                className="block text-sm font-medium text-slate-700"
              >
                Branch
              </label>

              <div className="mt-1">
                <select
                  id="branch"
                  className="block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                  onChange={(e) => setBranch(e.currentTarget.value)}
                  value={branch}
                >
                  <option value=""></option>
                  {branches.map((branch) => (
                    <option key={branch} value={branch}>
                      {branch}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="token"
                className="block text-sm font-medium text-slate-700"
              >
                Token
              </label>
              <div className="mt-1">
                <input
                  id="token"
                  type="password"
                  required
                  onChange={(e) => setToken(e.currentTarget.value)}
                  value={token}
                  className="block w-full appearance-none rounded-md border border-slate-300 px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-sky-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              >
                Preview
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export type AdminPageProps = CommonPageProps & {
  branches: string[];
};

export const getServerSideProps: GetServerSideProps<
  AdminPageProps,
  ParsedUrlQuery,
  PreviewData
> = async (context) => {
  const branches = await getPreviewBranchesFromGithub();
  return {
    props: { ...getCommonPageProps(context), branches },
  };
};
