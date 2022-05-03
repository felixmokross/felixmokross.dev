import { LinkIcon } from "../../icons";

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
