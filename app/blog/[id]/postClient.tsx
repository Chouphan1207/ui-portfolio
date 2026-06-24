'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaChartSimple, FaEllipsis } from 'react-icons/fa6';
import { IoChatbubbleEllipsesSharp, IoHeart, IoShare } from 'react-icons/io5';
import { PostHeader } from '../../../components/blog/Post';
import Widgets from '../../../components/blog/Widgets';
import SignUpPrompt from '../../../components/blog/SignUpPrompt';

interface Comment { name: string; text: string; username: string; }

export function PostClient({ initialPost }: { initialPost: any }) {
  const post = initialPost;

  return (
    <div className='min-h-screen text-primary max-w-350 mx-auto flex pt-25 justify-center'>
      <div className='grow max-w-2xl border-x border-gray-300'>
        <div className='py-4 px-3 text-xl sm:text-3xl font-bold flex items-center sticky top-0 border-b border-gray-300 bg-background/80 backdrop-blur-md'>
          <Link href="/blog"><FaArrowLeft className='w-5 h-5 mr-10' /></Link>
          Profile
        </div>

        <div className='flex flex-col p-3 space-y-5 border-b border-gray-300'>
          <div className='flex justify-between items-center mb-1.5'>
            <div className='flex space-x-3'>
              <Image src='/user.png' width={44} height={44} alt='Profile' className='w-11 h-11' />
              <div className='flex flex-col'>
                <span className='font-bold text-primary'>{post?.name}</span>
                <span className='text-neutral-400'>{post?.username}</span>
              </div>
            </div>
            <FaEllipsis />
          </div>
          <span className='text-md'>{post?.text}</span>
        </div>

        <div className='border-b border-gray-300 p-3 text-[15px]'>
          <span className='font-bold'>{post?.likes?.length || 0}</span> Likes
        </div>

        <div className='border-b border-gray-300 p-3 justify-evenly flex'>
          <IoChatbubbleEllipsesSharp className='w-5.5 h-5.5 cursor-pointer' />
          <IoHeart className='w-5.5 h-5.5 cursor-pointer' />
          <FaChartSimple className='w-5.5 h-5.5 cursor-not-allowed' />
          <IoShare className='w-5.5 h-5.5 cursor-not-allowed' />
        </div>

        {post?.comments?.map((comment: Comment, index: number) => (
          <div key={index} className='border-b border-gray-300'>
            <PostHeader name={comment.name} username={comment.username} text={comment.text} />
          </div>
        ))}
      </div>
      <Widgets />
      <SignUpPrompt />
    </div>
  );
}
