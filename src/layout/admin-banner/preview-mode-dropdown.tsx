import { Popover } from "@headlessui/react";
import { useRouter } from "next/router";
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  PropsWithChildren,
} from "react";
import useSWR from "swr";
import { cn } from "../../shared/classnames";
import { ChevronDownIcon } from "../../shared/icons";
import { disablePreviewMode, enablePreviewMode } from "./preview-client";

export function PreviewModeDropdown({
  previewBranch,
}: PreviewModeDropdownProps) {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={cn(
              "inline-flex items-center gap-1",
              open ? "text-white" : "text-slate-100 hover:text-white"
            )}
          >
            <span>
              {previewBranch
                ? `Previewing ${previewBranch}`
                : "Showing published content"}
            </span>
            <ChevronDownIcon className="h-6 w-6" />
          </Popover.Button>

          <Menu previewBranch={previewBranch} />
        </>
      )}
    </Popover>
  );
}

export type PreviewModeDropdownProps = {
  previewBranch: string | null;
};

function Menu({ previewBranch }: MenuProps) {
  const router = useRouter();
  const { data } = useSWR<string[]>(
    "/api/preview",
    async (url) => await (await fetch(url)).json()
  );
  if (!data) return null;
  return (
    <Popover.Panel className="absolute z-10 mt-2 rounded-md border-slate-700 bg-white p-4 text-sm text-slate-600 shadow-lg">
      <ul className="flex flex-col gap-2">
        {previewBranch && (
          <MenuItem
            onClick={async () => {
              await disablePreviewMode();

              router.push("/");
            }}
          >
            Show published content
          </MenuItem>
        )}
        {data
          .filter((b) => b !== previewBranch)
          .map((branch) => (
            <MenuItem
              key={branch}
              onClick={async () => {
                await enablePreviewMode(branch);

                router.push("/");
              }}
            >
              Preview {branch}
            </MenuItem>
          ))}
      </ul>
    </Popover.Panel>
  );
}

type MenuProps = {
  previewBranch: string | null;
};

function MenuItem(
  props: PropsWithChildren<
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
  >
) {
  return (
    <li>
      <button
        {...props}
        className="w-full text-left text-slate-600 hover:text-slate-900"
      />
    </li>
  );
}
