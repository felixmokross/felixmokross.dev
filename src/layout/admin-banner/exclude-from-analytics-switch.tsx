import { Switch } from "@headlessui/react";
import { useEffect, useState } from "react";
import { cn } from "../../shared/classnames";

export function ExcludeFromAnalyticsSwitch() {
  const [excludedFromAnalytics, setExcludedFromAnalytics] = useState(false);

  useEffect(() => {
    setExcludedFromAnalytics(
      localStorage.getItem("plausible_ignore") === "true"
    );
  }, []);

  return (
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
        "relative mt-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
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
  );
}
