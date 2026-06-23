import { notFound } from 'next/navigation';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase';
import { PostClient } from './postClient';

export async function generateMetadata(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return { title: `Post ${params.id}` };
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const postRef = doc(db, 'posts', params.id);
  const postSnap = await getDoc(postRef);
  const post = postSnap.exists() ? postSnap.data() : null;

  if (!post) return notFound();

  return <PostClient initialPost={post} />;
}
