'use client';

import { ReactNode } from "react";
import { useLoading } from "./loading-context";
import Header from "@/shared/ui/Header";
import LoadingIntro from "@/shared/ui/LoadingIntro";
import PageTransition from "@/shared/ui/PageTransition";

export default function ClientLayoutContent({ children }: { children: ReactNode }) {
  const { isLoadingDone } = useLoading();

  return (
    <>
      <LoadingIntro />
      {isLoadingDone && <Header />}
      <PageTransition>{children}</PageTransition>
    </>
  );
}
