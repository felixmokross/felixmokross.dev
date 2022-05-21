import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import useSWR from "swr";
import { disablePreviewMode, enablePreviewMode } from "./preview-client";

export function PreviewModeDropdown({
  previewBranch,
}: PreviewModeDropdownProps) {
  const router = useRouter();
  const [branch, setBranch] = useState(previewBranch || "");
  const { data } = useSWR<string[]>(
    "/api/preview",
    async (url) => await (await fetch(url)).json()
  );
  if (!data) return null; // TODO show loading indicator

  return (
    <select
      id="branch"
      className="block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
      onChange={handleBranchChanged}
      value={branch}
    >
      <option value="">no preview</option>
      {data.map((branch) => (
        <option key={branch} value={branch}>
          {branch}
        </option>
      ))}
    </select>
  );

  async function handleBranchChanged(e: ChangeEvent<HTMLSelectElement>) {
    const newBranch = e.currentTarget.value;
    setBranch(newBranch);

    if (!newBranch) {
      await disablePreviewMode();
    } else {
      await enablePreviewMode(newBranch);
    }

    router.push("/");
  }
}

export type PreviewModeDropdownProps = {
  previewBranch: string | null;
};
