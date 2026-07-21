'use client';

import { ReactNode } from "react";
import { useLoading } from "./loading-context";
import Header from "@/components/navBar/Header";
import LoadingIntro from "@/components/loading/LoadingIntro";
import PageTransition from "@/components/loading/PageTransition";

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
