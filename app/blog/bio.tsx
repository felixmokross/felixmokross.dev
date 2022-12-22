import Image from "next/image";
import { social } from "../common/social";
import profilePictureCircle from "../../common/profile-picture-circle.png";

export function Bio() {
  return (
    <div className="flex flex-col items-center px-6 sm:px-0">
      <div className="relative h-40 w-40">
        <Image
          src={profilePictureCircle}
          alt="Profile picture Felix Mokross"
          width={160}
          height={160}
          priority={true}
        />
      </div>

      <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-800 dark:text-white">
        Felix Mokross
      </h1>
      <div className="mt-2 max-w-lg text-center text-lg leading-relaxed text-slate-600 dark:text-slate-300">
        Zurich-based software engineer &middot; Lead&nbsp;Architect at{" "}
        <a
          href="https://zuehlke.com/"
          className="text-sky-600 hover:underline dark:text-sky-500"
        >
          Zühlke
        </a>
        <br />
        I&apos;m passionate about <strong>web development and UX</strong>.
        <br />
        On this blog I explore working with technologies like{" "}
        <strong>React</strong>, <strong>Next.js</strong>, and{" "}
        <strong>TypeScript</strong>.
      </div>
      <div className="mt-6 flex justify-center space-x-6 md:order-2">
        {social.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
            title={item.name}
          >
            <span className="sr-only">{item.name}</span>
            <item.icon className="h-7 w-7" aria-hidden="true" />
          </a>
        ))}
      </div>
    </div>
  );
}
