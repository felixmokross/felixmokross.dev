import { GetServerSideProps } from "next";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SiginPage() {
  const { query, isReady } = useRouter();
  useEffect(() => {
    if (!isReady) return;

    if (query.callbackUrl && typeof query.callbackUrl !== "string")
      throw new Error("callbackUrl must be a string!");

    signIn("github", { callbackUrl: query.callbackUrl || "/" });
  }, [query, isReady]);
  return (
    <p className="animate-pulse py-20 text-center text-3xl text-slate-500 dark:text-slate-300">
      Redirecting to GitHub…
    </p>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) return { props: {} };

  if (
    context.query.callbackUrl &&
    typeof context.query.callbackUrl !== "string"
  )
    throw new Error("callbackUrl must be a string!");

  return {
    redirect: {
      destination: context.query.callbackUrl || "/",
      permanent: false,
    },
  };
};
