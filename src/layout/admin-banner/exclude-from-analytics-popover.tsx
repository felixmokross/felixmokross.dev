import { Popover, Switch } from "@headlessui/react";
import { useEffect, useState } from "react";
import { cn } from "../../shared/classnames";
import { CogIcon } from "../../shared/icons";

export function ExcludeFromAnalyticsPopover() {
  const [excludedFromAnalytics, setExcludedFromAnalytics] = useState(false);

  useEffect(() => {
    setExcludedFromAnalytics(
      localStorage.getItem("plausible_ignore") === "true"
    );
  }, []);

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <div className="flex justify-center">
            <Popover.Button
              className={cn(
                "inline-flex items-center gap-1",
                open ? "text-white" : "text-slate-100 hover:text-white"
              )}
            >
              <CogIcon className="h-5 w-5" />
            </Popover.Button>
          </div>
          <Popover.Panel className="absolute z-20 mt-2 w-60 -translate-x-3/4 rounded-md border-slate-700 bg-white p-4 text-sm text-slate-600 shadow-lg">
            <Switch.Group as="div" className="flex items-center">
              <Switch
                checked={excludedFromAnalytics}
                onChange={() => {
                  if (excludedFromAnalytics) {
                    localStorage.removeItem("plausible_ignore");
                    setExcludedFromAnalytics(false);
                  } else {
                    localStorage.setItem("plausible_ignore", "true");
                    setExcludedFromAnalytics(true);
                  }
                }}
                className={cn(
                  excludedFromAnalytics ? "bg-sky-600" : "bg-gray-200",
                  "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                )}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    excludedFromAnalytics ? "translate-x-5" : "translate-x-0",
                    "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                  )}
                />
              </Switch>
              <Switch.Label
                as="span"
                className="ml-3 text-sm font-medium text-gray-900"
              >
                Exclude from analytics
              </Switch.Label>
            </Switch.Group>
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
}
