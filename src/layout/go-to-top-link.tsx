import { Transition } from "@headlessui/react";
import { useEffect, useState, MouseEvent as ReactMouseEvent } from "react";
import { DoubleUpChevronIcon } from "../shared/icons";

type ScrollDirection = "up" | "down";

const scrollDistanceThreshold = 75;

export function GoToTopLink() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = makeOnScroll(setIsVisible);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
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

function getScrollDirection(
  lastPosition: number,
  newPosition: number
): ScrollDirection {
  return newPosition < lastPosition ? "up" : "down";
}

function getCurrentScrollPosition() {
  return document.documentElement.scrollTop;
}

function makeOnScroll(setIsVisible: (isVisible: boolean) => void) {
  let lastPosition = getCurrentScrollPosition();
  let lastDirection: ScrollDirection = "down";
  let sameDirectionDistance = 0;

  return function onScroll() {
    const newPosition = getCurrentScrollPosition();
    const newDirection = getScrollDirection(lastPosition, newPosition);

    if (newDirection !== lastDirection) sameDirectionDistance = 0;

    sameDirectionDistance += Math.abs(newPosition - lastPosition);

    if (sameDirectionDistance > scrollDistanceThreshold) {
      setIsVisible(newPosition > 0 && newDirection === "up");
    }

    lastPosition = newPosition;
    lastDirection = newDirection;
  };
}
