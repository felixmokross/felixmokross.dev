import { social } from "../common/social";

export function Footer() {
  return (
    <footer className="absolute bottom-0 w-full border-t-2 border-slate-100 bg-slate-50 dark:border-slate-800 dark:bg-slate-800">
      <div
        className={
          "mx-auto max-w-3xl px-6 py-12 md:flex md:items-center md:justify-between"
        }
      >
        <div className="flex justify-center space-x-6 md:order-2">
          {social.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-slate-400 hover:text-slate-500 dark:text-slate-400 dark:hover:text-slate-300"
              title={item.name}
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-base text-slate-400 dark:text-slate-400">
            &copy; Felix Mokross
          </p>
        </div>
      </div>
    </footer>
  );
}
