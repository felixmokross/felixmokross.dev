import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SiginPage() {
  const { query, isReady } = useRouter();
  useEffect(() => {
    if (!isReady) return;

    if (typeof query.callbackUrl !== "string")
      throw new Error("callbackUrl must be a string!");

    signIn("github", { callbackUrl: query.callbackUrl });
  }, [query, isReady]);
  return <p className="p-4">Redirecting to GitHub…</p>;
}
