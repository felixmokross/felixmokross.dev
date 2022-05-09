import { LinkIcon } from "../../../icons";
import toast from "react-hot-toast";
import { useRef } from "react";

export function PostH2(props: PostHProps) {
  return <PostHeading as="h2" {...props} />;
}

export function PostH3(props: PostHProps) {
  return <PostHeading as="h3" {...props} />;
}

export function PostH4(props: PostHProps) {
  return <PostHeading as="h4" {...props} />;
}

export function PostH5(props: PostHProps) {
  return <PostHeading as="h5" {...props} />;
}

export function PostH6(props: PostHProps) {
  return <PostHeading as="h6" {...props} />;
}

function PostHeading({
  as: HeadingElement,
  children,
  id,
  ...rest
}: PostHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  return (
    <HeadingElement className="group" id={id} ref={ref} {...rest}>
      {children}
      {id && (
        <>
          {" "}
          <span className="not-prose">
            <a
              onClick={async (e) => {
                if (!ref.current) return;

                e.preventDefault();

                ref.current.scrollIntoView({ behavior: "smooth" });
                history.pushState({}, "", `#${id}`);

                await navigator.clipboard.writeText(location.href);
                toast.success("Link copied to clipboard");
              }}
              className="hidden text-slate-400 hover:text-slate-600 group-hover:inline-block dark:text-slate-600 dark:hover:text-slate-400"
              href={`#${id}`}
            >
              <LinkIcon className="h-5 w-5" />
            </a>
          </span>
        </>
      )}
    </HeadingElement>
  );
}

export type PostHProps = React.DetailedHTMLProps<
  React.DetailsHTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

type PostHeadingProps = PostHProps & {
  as: "h2" | "h3" | "h4" | "h5" | "h6";
};
