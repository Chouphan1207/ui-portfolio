'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

const TimelineCard = ({ item }: { item: TimelineEntry }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="grid grid-cols-1 md:grid-cols-[200px_1fr] lg:grid-cols-[250px_1fr] gap-4 pt-10 md:pt-16 first:pt-0"
  >
    {/* Cột trái: Chứa tiêu đề mốc thời gian và điểm chấm tròn */}
    <div className="sticky top-24 self-start z-40 hidden md:flex items-start">
      <div className="absolute h-8 w-8 rounded-full border border-border bg-secondary flex items-center justify-center shadow-xs">
        {/* Điểm nhấn tạo hiệu ứng pulse (nhịp đập) */}
        <div className="h-6 w-6 rounded-full bg-background animate-pulse" />
      </div>
      <h3 className="text-2xl lg:text-3xl font-extrabold text-primary tracking-tight pl-15">
        {item.title}
      </h3>
    </div>

    {/* Cột phải: Nội dung chi tiết của từng mốc thời gian */}
    <div className="relative w-full ">
      {/* Tiêu đề hiển thị trên mobile khi màn hình quá hẹp cho cột trái */}
      <h3 className="md:hidden text-2xl mb-3 font-bold text-[--ring]">{item.title}</h3>
      <div className="hover:translate-x-1 transition-transform duration-300">
        {item.content}
      </div>
    </div>
  </motion.div>
);

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const containerRef = useRef<HTMLDivElement>(null); // Ref để theo dõi vùng chứa tổng thể phục vụ useScroll
  const contentRef = useRef<HTMLDivElement>(null);   // Ref để đo chiều cao thực tế của các nội dung timeline
  const [height, setHeight] = useState(0);

  // ResizeObserver: Tự động cập nhật chiều cao nếu nội dung bên trong timeline thay đổi kích thước
  useEffect(() => {
    if (!contentRef.current) return;
    const observer = new ResizeObserver(([entry]) => setHeight(entry.contentRect.height));
    observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, []);

  // useScroll: Theo dõi vị trí cuộn của người dùng so với containerRef
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 100%"] // Bắt đầu animation khi scroll tới 50% màn hình
  });

  // Chuyển đổi giá trị scroll (0 đến 1) thành chiều cao pixel của đường kẻ
  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  // Hiệu ứng mờ dần (fade in) cho đường kẻ khi bắt đầu xuất hiện
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full bg-background font-sans px-4 md:px-10" ref={containerRef}>

      {/* Phần giới thiệu đầu trang đã được căn giữa */}
      <div className="max-w-7xl mx-auto py-20 px-4 flex flex-col items-center text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-[--ring]">
          My Past Journey
        </h2>
        <p className="text-description text-sm md:text-base max-w-md">
          The past 4 years have been a journey of growth and creation.
        </p>
      </div>

      {/* Vùng chứa timeline chính */}
      <div ref={contentRef} className="relative max-w-7xl mx-auto pb-20 space-y-12">
        {data.map((item) => <TimelineCard key={item.title} item={item} />)}

        {/* Đường kẻ tiến trình (Progress Line) nằm bên trái */}
        <div className="hidden md:block absolute top-0 left-3.5 w-1 h-full bg-neutral-200">
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className="absolute inset-x-0 top-0 w-full bg-linear-to-b from-primary via-secondary to-transparent rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
