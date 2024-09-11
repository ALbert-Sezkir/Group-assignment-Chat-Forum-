"use client";
import Navbar from '@/app/_components/navbar';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import { SignInButton } from '@clerk/nextjs';

import Link from 'next/link';

const ThreadDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [thread, setThread] = useState<Thread | QNAThread | null>(null);
  const [comment, setComment] = useState<string>("");
  const { user } = useUser();

  useEffect(() => {
    if (id) {
      const savedThreads = localStorage.getItem('threads');
      if (savedThreads) {
        const threads: (Thread | QNAThread)[] = JSON.parse(savedThreads);
        const idNumber = parseInt(id, 10);
        const foundThread = threads.find(thread => thread.id === idNumber);
        setThread(foundThread || null);
      }
    }
  }, [id]);

  const handleAddComment = () => {
    if (thread && comment && !thread.locked && user) {
      const newComment: ThreadComment = {
        id: Date.now(),
        thread: thread.id,
        content: comment,
        creator: {
          userName: user.fullName || user.username || "Unnamed User",
          password: "", // Not used
        },
      };

      const updatedThread = {
        ...thread,
        comments: [...thread.comments, newComment],
      };

      const savedThreads = localStorage.getItem("threads");
      if (savedThreads) {
        const threads: (Thread | QNAThread)[] = JSON.parse(savedThreads);
        const updatedThreads = threads.map(t => (t.id === thread.id ? updatedThread : t));
        localStorage.setItem("threads", JSON.stringify(updatedThreads));

        setThread(updatedThread);
        setComment(""); 
       
      }
    }
  };

  const handleMarkAsAnswer = (commentId: number) => {
    if (thread && thread.category === "QNA") {
      const updatedThread: QNAThread = {
        ...(thread as QNAThread),
        isAnswered: !(thread as QNAThread).isAnswered,
        commentAnswerId: (thread as QNAThread).isAnswered ? undefined : commentId,
      };

      const savedThreads = localStorage.getItem('threads');
      if (savedThreads) {
        const threads: (Thread | QNAThread)[] = JSON.parse(savedThreads);
        const updatedThreads = threads.map(t => t.id === thread.id ? updatedThread : t);
        localStorage.setItem('threads', JSON.stringify(updatedThreads));

        setThread(updatedThread);
      }
    }
  };

  const isQNAThread = (thread: Thread | QNAThread): thread is QNAThread => {
    return thread.category === "QNA";
  };

  if (!thread) {
    return <p className="text-red-500 text-center text-5xl">Loading...</p>;
  }

  return (
    <div className="bg-[#16202a] h-screen font-serif">
      <Navbar />
      <main className="flex items-center bg-[#16202a] justify-center p-10">
        <div className="grid-cols-1 md:grid-cols-2"></div>
          <div className="flex items-center justify-center flex-col">
            <div className="w-[700px] border-2 shadow-xl border-opacity-50 mt-3 p-9 rounded bg-[#16202a]">
              <h1 className="font-bold text-center mt-7 text-5xl text-white">{thread.title}</h1>
              <p className="font-bold text-center text-2xl mt-10 py-3 text-white">{thread.description}</p>
              <p className="text-sm m-2 text-right text-gray-500 font-bold">{new Date(thread.creationDate).toLocaleString()}</p>
              <hr className="mt-4" />
              <div className="my-4 p-9">

              <div>
           
          </div>
          {thread.comments.map(comment => (
  <div key={comment.id} className="mb-4">
    <p className="bg-slate-200 rounded p-2 text-black">{comment.content}</p>
    <p className="text-white">{comment.creator.userName}</p>

    <SignedIn>
      {isQNAThread(thread) && (
        <button
          className="mt-2 bg-green-500 text-white px-3 rounded"
          onClick={() => handleMarkAsAnswer(comment.id)}
        >
          {thread.commentAnswerId === comment.id ? 'Unmark as Answer' : 'Mark as Answer'}
        </button>
      )}
    </SignedIn>

  
    {isQNAThread(thread) && thread.commentAnswerId === comment.id && (
      <p className="text-green-500">This is the accepted answer.</p>
    )}
  </div>
))}

                <hr className="mt-7" />

               
                <SignedIn>
                  {!thread.locked && (
                    <div className='relative flex items-center right-5 mt-2 w-[600px]'>
                      <div
                        className="text-white m-4 p-5 rounded-md w-[800px] h-[80px] border border-white-300"
                        contentEditable
                        onInput={(e) => setComment((e.target as HTMLDivElement).innerText)}
                      />
                      <button
                        className="mt-2 bg-indigo- hover:bg-indigo-700 border text-white px-2 rounded"
                        onClick={handleAddComment}
                      >
                        Add Comment
                      </button>
                    </div>
                  )}
                  {thread.locked && (
                    <p className="text-red-500 text-center">This thread is locked and cannot receive new comments.</p>
                  )}
                </SignedIn>

                <SignedOut>
                  <SignInButton>
                      <button className="w-full mt-6 text-white border-2 h-12 rounded-full bg-indigo hover:text-white hover:bg-indigo-700">Sign in</button>
                  </SignInButton>
                  <p className="flex justify-center text-white">Please sign in to add a comment.</p>
                </SignedOut>
              </div>
            </div>
          </div>
        
      </main>
    </div>
  );
};

export default ThreadDetail;

