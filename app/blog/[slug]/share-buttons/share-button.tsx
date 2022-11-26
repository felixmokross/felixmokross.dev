import { AnchorHTMLAttributes, DetailedHTMLProps, ReactElement } from "react";
import { IconProps } from "../../../../src/shared/icons";

export function ShareButton({ icon: Icon, ...props }: ShareButtonProps) {
  return (
    <a
      {...props}
      className="block text-slate-400 hover:text-slate-600 dark:text-slate-600 dark:hover:text-slate-400"
    >
      <Icon className="h-7 w-7" />
    </a>
  );
}

type ShareButtonProps = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> & {
  icon: (props: IconProps) => ReactElement;
};
