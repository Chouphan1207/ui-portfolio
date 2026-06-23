'use client'

import React from 'react'
import Image from 'next/image'
import { IoChatbubbleEllipsesSharp, IoHeart as HeartSolid, IoShare, IoHeart } from "react-icons/io5";
import { FaChartSimple } from "react-icons/fa6";
import { arrayRemove, arrayUnion, doc, DocumentData, Timestamp, updateDoc } from 'firebase/firestore';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { openCommentModal, openSignInModal, setCommentDetails } from '@/redux/slices/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { RootState } from '@/redux/store';
import { db } from '@/firebase';

dayjs.extend(relativeTime);

interface PostProps {
  data: DocumentData
  id: string
}

export default function Post({ data, id }: PostProps) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const isLiked = data.likes?.includes(user?.uid);

  const likePost = async () => {
    if (!user.username){
      dispatch(openSignInModal())
      return;
    }

    if (!user?.uid) return;

    const postRef = doc(db, "posts", id);

    if (isLiked) {
      await updateDoc(postRef, {
        likes: arrayRemove(user.uid)
      });
    } else {
      await updateDoc(postRef, {
        likes: arrayUnion(user.uid)
      });
    }
  };

  return (
    <div>
      <Link href={`/blog/${id}`}>
        <PostHeader
          username={data.username}
          name={data.name}
          timestamp={data.timestamp}
          text={data.text}
        />
      </Link>

      <div className='ml-16 p-3 flex space-x-14 my-2'>
        {/* Comment Icon */}
        <div className='relative'>
          <IoChatbubbleEllipsesSharp
            className='w-[22px] h-[22px] cursor-pointer hover:text-[#63c7f5] transition'
            onClick={() => {
                  if (!user.username){
                  dispatch(openSignInModal())
                  return;
                  }
              dispatch(setCommentDetails({
                name: data.name,
                username: data.username,
                id,
                text: data.text,
              }));
              dispatch(openCommentModal());
            }}
          />
          {
            data.comments.length > 0 && 
            <span className='absolute text-xs top-1 -right-3'>
            {data.comments.length}
            </span>
          }
        </div>

        {/* Like Icon */}
        <div className='relative'>
          {isLiked ? (
            <HeartSolid
              className='w-[22px] h-[22px] cursor-pointer text-[#f04b96] transition'
              onClick={likePost}
            />
          ) : (
            <IoHeart
              className='w-[22px] h-[22px] cursor-pointer hover:text-[#f04b96] transition'
              onClick={likePost}
            />
          )}
          {
            data.likes.lengths > 0 &&
              <span className='absolute text-xs top-1 -right-3'>
            {data.likes.length}
          </span>
          }
        </div>

        {/* Views */}
        <div className='relative'>
          <FaChartSimple className='w-[22px] h-[22px] cursor-not-allowed' />
        </div>

        {/* Share */}
        <div className='relative'>
          <IoShare className='w-[22px] h-[22px] cursor-not-allowed' />
        </div>
      </div>
    </div>
  );
}

interface PostHeaderProps {
  username: string;
  name: string;
  timestamp?: Timestamp;
  text: string;
  replyTo?: string;
}

export function PostHeader({ username, name, timestamp, text, replyTo }: PostHeaderProps) {
  return (
    <div className='flex items-center gap-2 space-x-3 p-3'>
      <Image
        src="/hero.jpg"
        alt="Profile Picture"
        width={44}
        height={44}
        className="rounded-full z-10"
      />

      <div className='text-primary text-[15px] flex flex-col space-y-1.5'>
        <div className='flex space-x-1.5 text-[15px] text-neutral-500'>
          <span className='font-bold text-primary whitespace-nowrap overflow-hidden text-ellipsis inline-block max-w-[160px]'>
            {name}
          </span>
          <span className='whitespace-nowrap overflow-hidden text-ellipsis inline-block max-w-[160px]'>
            @{username}
          </span>

          {timestamp && (
            <>
              <span>-</span>
              <span>{dayjs(timestamp.toDate()).fromNow()}</span>
            </>
          )}
        </div>

        <span>{text}</span>

        {replyTo && (
          <span className='text-sm text-primary'>
            Replying to <span className='text-secondary'>@{replyTo}</span>
          </span>
        )}
      </div>
    </div>
  );
}
