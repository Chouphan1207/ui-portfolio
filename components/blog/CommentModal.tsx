'use client'

import { closeCommentModal } from '@/redux/slices/modalSlice'
import { RootState } from '@/redux/store'
import { Modal } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { PostHeader } from './Post'
import PostInput from './PostInput'
import { FaXmark } from 'react-icons/fa6'

export default function CommentModal() {
    const open = useSelector((state: RootState) => state.modals.commentModalOpen)
    const commentDetails = useSelector((state: RootState) => state.modals.commentPostDetails)
    const dispatch = useDispatch()
  return (
    <>
        <Modal
        className='flex justify-center items-center'
        open={open}
        onClose={() => dispatch(closeCommentModal())}
        >
            <div className='w-full h-full sm:w-[600px] sm:h-fit bg-primary sm:rounded-xl outline-none relative'>
            <FaXmark
            className='mt-7 ms-8 cursor-pointer text-black'
            onClick={() => dispatch(closeCommentModal())}/>
            <div className='pt-10 sm:pt-5 pb-10 px-0 sm:px-5 flex flex-col space-y-5'>
                <PostHeader
                name={commentDetails.name}
                username={commentDetails.username}
                text={commentDetails.text}
                replyTo={commentDetails.username}
                />
                <div className='mt-4'>
                  <PostInput
                  insideModal= {true}/>
                </div>
                <div className='absolute w-0.5 h-32 bg-secondary left-[32px] sm:left-[52px] top-31 sm:top-27 z-0'></div>
              </div>
            </div>
        </Modal>
    </>
  )
}
