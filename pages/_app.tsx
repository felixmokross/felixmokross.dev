import "../styles/globals.css";
import "../styles/highlight.css";
import type { AppProps } from "next/app";
import { Toaster, resolveValue } from "react-hot-toast";
import { Transition } from "@headlessui/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster containerClassName="mt-8">
        {(t) => (
          <Transition
            appear
            show={t.visible}
            className="transform rounded bg-slate-900/80 px-3 py-2 text-sm font-medium text-slate-50 shadow-md"
            enter="transition-all duration-150"
            enterFrom="opacity-0 scale-50"
            enterTo="opacity-100 scale-100"
            leave="transition-all duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-75"
          >
            {resolveValue(t.message, t)}
          </Transition>
        )}
      </Toaster>
    </>
  );
}

export default MyApp;
