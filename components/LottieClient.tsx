'use client'
import Lottie from "lottie-react";

interface LottieClientProps {
  animationData: any;
  height?: number;
  width?: number;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
}

export default function LottieClient({
  animationData,
  height,
  width,
  className,
  loop = false,
  autoplay = false
}: LottieClientProps) {

  if (!animationData) return null;

  return (
    <div style={{ height, width }}>
      <Lottie
        animationData={animationData}
        className={className}
        loop={loop}
        autoplay={autoplay}
      />
    </div>
  );
}
