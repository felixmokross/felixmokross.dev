import Link from "next/link";
import { alternateSiteTitle } from "../../common/util";

export function Header() {
  return (
    <header className="mx-auto flex max-w-3xl justify-center px-6">
      <nav>
        <Link
          href="/blog"
          className="flex items-center py-8 text-slate-800 hover:underline dark:text-slate-100"
        >
          <h1 className="flex items-baseline space-x-4 text-2xl font-bold tracking-tight">
            {alternateSiteTitle}
          </h1>
        </Link>
      </nav>
    </header>
  );
}
