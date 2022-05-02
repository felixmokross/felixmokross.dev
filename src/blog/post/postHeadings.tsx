import { SVGProps } from "react";

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
  return (
    <HeadingElement className="group" id={id} {...rest}>
      {children}{" "}
      <span className="not-prose">
        <a
          className="hidden text-slate-400 hover:text-slate-600 group-hover:inline-block dark:text-slate-600 dark:hover:text-slate-400"
          href={`#${id}`}
        >
          <LinkIcon className="h-5 w-5" />
        </a>
      </span>
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

function LinkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
        clipRule="evenodd"
      />
    </svg>
  );
}
