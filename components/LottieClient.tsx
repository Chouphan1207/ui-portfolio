'use client'
import Lottie from "lottie-react";

interface LottieClientProps {
  animationData: any;
  height?: number;
  width?: number;
  className?: string;
}

export default function LottieClient({ animationData, height, width, className }: LottieClientProps) {
  return (
    <div style={{ height, width }}>
      <Lottie animationData={animationData} className={className} />
    </div>
  );
}
