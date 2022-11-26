import { PropsWithChildren } from "react";

export function FilenameBar({ children }: PropsWithChildren<{}>) {
  return (
    <div className="-mb-2 rounded-t-md border-b border-slate-500 bg-slate-700 px-4 py-2 text-center font-mono text-sm text-slate-300 dark:bg-slate-800">
      {children}
    </div>
  );
}
