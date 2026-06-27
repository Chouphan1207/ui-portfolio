'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

// Absolute Path Aliases
import { blogItems } from '@/components/data'
import { DraggableCardBody, DraggableCardContainer } from '@/components/blog/DraggableCard'
import PostFeed from '@/components/blog/PostFeed'
import Widgets from '@/components/blog/Widgets'
import SignUpPrompt from '@/components/blog/SignUpPrompt'
import CommentModal from '@/components/blog/CommentModal'
import { Spotlight } from '@/components/home/background/Spotlight'

const Blogpage = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.5, duration: 0.5, ease: "easeIn" } }}
        className='relative overflow-hidden w-full'
      >
        {/* Decorative Ambient Spotlights */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <Spotlight className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen" fill="#3fc1c0" />
          <Spotlight className="-top-10 left-[80%] h-[80vh] w-[40vw]" fill="#0899ba" />
          <Spotlight className="top-28 left-80 h-[80vh] w-[50vw]" fill="#1c558e" />
        </div>

        <DraggableCardContainer className="relative flex min-h-screen w-full items-center justify-center overflow-x-hidden z-10">
          {/* Main Hero Header Title */}
          <p className="absolute top-90 mx-auto max-w-sm font-bold -translate-y-3/4 lg:ml-10 text-center text-7xl font-sans">
            Welcome to my Blog
          </p>

          {/* Interactive Feature Cards */}
          {blogItems.map((item, index) => (
            <DraggableCardBody key={index} className={item.className}>
              <div className="relative h-70 w-70 overflow-hidden rounded-lg">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={280} // 70 * 4 = 280px width context
                  height={280}
                  priority={index < 2} // Preloads top featured content assets
                  className="pointer-events-none relative z-10 object-cover w-full h-full"
                />
              </div>
              <h3 className="mt-4 text-center text-2xl font-bold text-card">
                {item.title}
              </h3>
            </DraggableCardBody>
          ))}

          {/* Active Feed Timelines */}
          <div className='min-h-screen w-full text-primary max-w-7xl mx-auto flex pt-150 pb-20 justify-center gap-8 px-4'>
            <PostFeed />
            <Widgets />
          </div>

          <CommentModal />
        </DraggableCardContainer>
      </motion.div>

      <SignUpPrompt />
    </>
  )
}

export default Blogpage
