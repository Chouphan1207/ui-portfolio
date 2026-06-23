'use client'

import React, { useEffect, useState } from 'react'
import PostInput from './PostInput'
import { collection, DocumentData, onSnapshot, orderBy, query, QueryDocumentSnapshot } from 'firebase/firestore'
import { db } from '@/firebase'
import Post from './Post'

const PostFeed = () => {
  const [posts, setPosts] = useState<QueryDocumentSnapshot<DocumentData, DocumentData>[]>([])
  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const snapshotDocs = snapshot.docs
      setPosts(snapshotDocs)
    })

    return unsubscribe
  }, [])
  return (
    <div className='flex-grow max-w-2xl items-center justify-center p-3'>
        <div className='"py-4 px-3 text-3xl font-bold z-50 p-3'>
            Home
        </div>
    <PostInput/>
    {posts.map(post => <Post 
    key={post.id}
    data={post.data()}
    id={post.id}
    />)}
    </div>
  )
}

export default PostFeed