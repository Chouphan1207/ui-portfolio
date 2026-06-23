'use client'
import Lottie from "lottie-react";

interface LottieClientProps {
  animationData: any; // lottie-react uses animationData instead of 'options'
  className?: string;
}

export default function LottieClient({ animationData, className }: LottieClientProps) {
  return <Lottie animationData={animationData} className={className} />;
}
