import { Transition } from "@headlessui/react";
import { useEffect, useState, MouseEvent as ReactMouseEvent } from "react";
import { DoubleUpChevronIcon } from "../shared/icons";

export function GoToTopLink() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let lastPosition = getCurrentScrollPosition();

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);

    function onScroll() {
      const newPosition = getCurrentScrollPosition();

      setIsVisible(isScrollingUp(lastPosition, newPosition));

      lastPosition = newPosition;
    }
  }, []);

  return (
    <Transition
      show={isVisible}
      as="a"
      enter="transition-all duration-150"
      enterFrom="opacity-0 scale-50"
      enterTo="opacity-100 scale-100"
      leave="transition-all duration-150"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-75"
      href="#"
      onClick={(e: ReactMouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        scrollToTop();
      }}
      title="Go to top"
      className="fixed bottom-10 right-10 inline-block rounded-full bg-slate-900/80 p-2 text-slate-50 shadow-lg hover:bg-slate-900 hover:text-white dark:bg-slate-600/80 dark:hover:bg-slate-600"
    >
      <DoubleUpChevronIcon className="h-8 w-8 sm:h-5 sm:w-5" />
    </Transition>
  );
}

function scrollToTop() {
  window.scrollTo({
    behavior: "smooth",
    top: 0,
    left: 0,
  });
  history.replaceState({}, "", location.pathname);
}

function isScrollingUp(lastPosition: number, newPosition: number) {
  return newPosition > 0 && newPosition < lastPosition;
}

function getCurrentScrollPosition() {
  return document.documentElement.scrollTop;
}
