'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

import { blogItems } from '@/components/data';
import { DraggableCardBody, DraggableCardContainer } from '@/components/blog/DraggableCard';
import PostFeed from '@/components/blog/PostFeed';
import Widgets from '@/components/blog/Widgets';
import SignUpPrompt from '@/components/blog/SignUpPrompt';
import CommentModal from '@/components/blog/CommentModal';
import { Spotlight } from '@/components/contact/Spotlight';
import WavyBackground from '@/components/home/background/WavyBackground';

const Blogpage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.5, duration: 0.5, ease: "easeIn" } }}
      className='relative w-full min-h-screen bg-background' // Đảm bảo trang có chiều cao
    >

      {/* 2. Spotlight đặt trên background nhưng dưới nội dung */}
      <div className="pointer-events-none fixed inset-0 z-10">
        <Spotlight className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen" fill="#3fc1c0" />
        <Spotlight className="-top-10 left-[80%] h-[80vh] w-[40vw]" fill="#0899ba" />
        <Spotlight className="top-28 left-80 h-[80vh] w-[50vw]" fill="#1c558e" />
      </div>

      {/* 3. Nội dung chính (Phải có z-index cao hơn và background trong suốt nếu muốn thấy sóng) */}
      <DraggableCardContainer className="relative z-20 flex min-h-screen w-full flex-col items-center justify-center overflow-x-hidden">

        {/* Cards */}
        <div className="flex flex-wrap justify-center gap-6">
          {blogItems.map((item, index) => (
            <DraggableCardBody key={index} className={item.className}>
              <div className="relative h-70 w-70 overflow-hidden rounded-lg bg-background/20 backdrop-blur-sm">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={280}
                  height={280}
                  priority={index < 2}
                  className="pointer-events-none relative z-10 object-cover w-full h-full"
                />
              </div>
              <h3 className="mt-4 text-center text-2xl font-bold">{item.title}</h3>
            </DraggableCardBody>
          ))}
        </div>

        {/* Feed */}
        <div className='w-full text-primary max-w-7xl mx-auto flex pt-20 pb-20 justify-center gap-8 px-4'>
          <PostFeed />
          <Widgets />
        </div>

        <CommentModal />
      </DraggableCardContainer>

      <SignUpPrompt />
    </motion.div>
  );
};

export default Blogpage;
