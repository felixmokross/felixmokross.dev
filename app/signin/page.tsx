import { SigninRedirecter } from "./signin-redirecter";

export default async function Page() {
  return (
    <div className="flex grow animate-pulse flex-col justify-center py-20 text-center text-3xl text-slate-500 dark:text-slate-300">
      <div>Redirecting to GitHub…</div>
      <SigninRedirecter />
    </div>
  );
}
