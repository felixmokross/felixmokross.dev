"use client";
import { Transition } from "@headlessui/react";
import { resolveValue, Toaster } from "react-hot-toast";
import { CircleCheckIcon } from "../common/icons";

export function BlogToaster() {
  return (
    <Toaster containerClassName="mt-8">
      {(t) => (
        <Transition
          appear
          show={t.visible}
          className="flex transform items-center gap-1 rounded bg-slate-900/80 px-3 py-2 text-sm font-medium text-slate-50 shadow-md dark:bg-slate-600/80"
          enter="transition-all duration-150"
          enterFrom="opacity-0 scale-50"
          enterTo="opacity-100 scale-100"
          leave="transition-all duration-150"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-75"
        >
          <CircleCheckIcon className="h-5 w-5 text-emerald-300" />
          {resolveValue(t.message, t)}
        </Transition>
      )}
    </Toaster>
  );
}
