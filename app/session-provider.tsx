"use client";

import { PropsWithChildren } from "react";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

export function SessionProvider({ children }: PropsWithChildren<{}>) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}
