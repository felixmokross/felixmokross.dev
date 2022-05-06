import { GetServerSideProps } from "next";
import { useState } from "react";
import { getPreviewBranchesFromGithub } from "../src/github";
import Layout from "../src/Layout";

export default function AdminPage({ branches }: AdminPageProps) {
  const [branch, setBranch] = useState(branches[0] || "");
  const [token, setToken] = useState("");

  return (
    <Layout>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = `/api/preview?token=${encodeURIComponent(
                token
              )}&branch=${encodeURIComponent(branch)}`;
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

export type AdminPageProps = {
  branches: string[];
};

export const getServerSideProps: GetServerSideProps = async () => {
  const branches = await getPreviewBranchesFromGithub();
  return {
    props: { branches },
  };
};
