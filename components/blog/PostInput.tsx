'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import { MdInsertPhoto } from 'react-icons/md'
import { FaChartSimple, FaFaceSmile, FaCalendar } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import { addDoc, arrayUnion, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { closeCommentModal, openSignInModal } from '@/redux/slices/modalSlice';

interface PostInputProps {
        insideModal?: boolean 
}

export default function PostInput({insideModal}: PostInputProps) {
        const [text, setText] = useState("")
        const user = useSelector((state : RootState) => state.user)
        const commentDetails = useSelector((state: RootState) => state.modals.commentPostDetails)
        const dispatch = useDispatch()

        async function sendPost() {
                    if (!user.username){
                        dispatch(openSignInModal())
                        return;
                        }

                await addDoc(collection(db, "posts"), {
                        text: text,
                        name: user.name,
                        username: user.username,
                        timestamp: serverTimestamp(),
                        likes: [],
                        comments: [],
                });
                setText('')
        }
        async function sendComment() {
                const postRef = doc(db, "posts", commentDetails.id)
                await updateDoc(postRef, {
                        comments: arrayUnion({
                                name: user.name,
                                username: user.username,
                                text: text,
                        })
                });
                setText('')
                dispatch(closeCommentModal())
        }
        
    return (
        <div className='flex space-x-5 px-3'>
                <Image
                        src={insideModal ? "/user.png" : "/Logo.png"}
                        width={44}
                        height={44}
                        alt={insideModal ? "Profile Picture" : "Logo"}
                        className='w-11 h-11 z-10 rounded-full'
                />

                <div className='w-full space-y-3'>
                        <textarea
                                placeholder={insideModal ? "Send your Reply" : "What's on your mind?"}
                                className='resize-none w-full outline-none min-h-[50px] text-md '
                                onChange={(event) => setText(event.target.value)}
                        />
                        <div className='flex justify-between items-center mb-10'>
                                <div className='flex space-x-1.5'>
                                    <MdInsertPhoto className='w-[22px] h-[22px] text-lg text-primary'/>
                                    <FaChartSimple className='w-[22px] h-[22px] text-lg text-primary'/>
                                    <FaFaceSmile className='w-[22px] h-[22px]  text-lg text-primary'/>
                                    <FaCalendar className='w-[22px] h-[22px]  text-lg text-primary'/>
                                    <FaMapMarkerAlt className='w-[22px] h-[22px]  text-lg text-primary'/>
                                </div>
                                <div className='flex space-x-1.5, select-all content-center'>
                                </div>
                                <button type="button" 
                                onClick={() => insideModal ? sendComment() : sendPost()}
                                disabled={!text}
                                className='bg-secondary text-secondary px-4 py-2 rounded-lg hover:bg-cyan-600 disabled:bg-opacity-60'>Post</button>
                        </div>
                </div>        
        </div>
    )
}