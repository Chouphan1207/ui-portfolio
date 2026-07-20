'use client';

import { ReactNode } from "react";
import { useLoading } from "./loading-context";
import Header from "@/shared/ui/navBar/Header";
import LoadingIntro from "@/lib/loading/LoadingIntro";
import PageTransition from "@/shared/ui/PageTransition";

export default function ClientLayoutContent({ children }: { children: ReactNode }) {
  const { isLoadingDone } = useLoading();

  return (
    <>
      <LoadingIntro />
      <div
        className={`transition-opacity duration-500 ${
          isLoadingDone ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Header />
      </div>

      <main className={`transition-opacity duration-500 delay-300 ${
          isLoadingDone ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <PageTransition>{children}</PageTransition>
      </main>
    </>
  );
}
