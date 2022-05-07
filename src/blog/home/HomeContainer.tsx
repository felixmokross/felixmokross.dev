import { PropsWithChildren } from "react";

export default function HomeContainer({ children }: PropsWithChildren<{}>) {
  return (
    <main className="relative px-0 pt-20 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
      {children}
    </main>
  );
}
