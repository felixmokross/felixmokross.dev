"use client";
import { signIn } from "next-auth/react";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export function SigninRedirecter() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  useEffect(() => {
    signIn("github", { callbackUrl: callbackUrl || "/" });
  }, [callbackUrl]);
  return null;
}
