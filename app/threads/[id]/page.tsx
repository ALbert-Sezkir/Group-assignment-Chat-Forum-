'use client';

import Navbar from '@/app/_components/navbar';
import { useParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { useUser } from '@clerk/clerk-react';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import { SignInButton } from '@clerk/nextjs';
import { FaReply } from 'react-icons/fa';
import { Trash2, Lock, LockOpen } from 'lucide-react';
import censorComment from '@/lib/utils';

const ADMIN_USER_ID = "user_2le5oJ8jdX29j9GvkxM6KRmDG2D";

const ThreadDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [thread, setThread] = useState<Thread | QNAThread | null>(null);
  const [comment, setComment] = useState<string>('');
  const { user } = useUser();
  const isAdmin = user?.id === ADMIN_USER_ID;
  const isThreadCreator = user?.id === thread?.creator.id;
  const [parentCommentId, setParentComment] = useState<number | null>(null);
  const [replyingToComment, setReplyingToComment] = useState<ThreadComment | null>(null);
  const commentRef = useRef<HTMLDivElement>(null);

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
      const censoredComment = censorComment(comment);
      const newComment: ThreadComment = {
        id: Date.now(),
        thread: thread.id,
        content: censoredComment,
        creator: {
          userName: user.fullName || user.username || 'Unnamed User',
          password: '',
          isModerator: user.publicMetadata?.isModerator === true,
          id: user.id,
        },
        parentCommentId: parentCommentId || undefined,
        creationDate: new Date().toISOString(),
      };

      const updatedThread = {
        ...thread,
        comments: [...thread.comments, newComment],
      };

      const savedThreads = localStorage.getItem('threads');
      if (savedThreads) {
        const threads: (Thread | QNAThread)[] = JSON.parse(savedThreads);
        const updatedThreads = threads.map(t => (t.id === thread.id ? updatedThread : t));
        localStorage.setItem('threads', JSON.stringify(updatedThreads));

        setThread(updatedThread);
        setComment('');
        setParentComment(null);
        setReplyingToComment(null);

        if (commentRef.current) {
          commentRef.current.innerText = '';
          commentRef.current.focus();
        }
      }
    }
  };

  const handleMarkAsAnswer = (commentId: number) => {
    if (thread && isQNAThread(thread) && user && user.id === thread.creator.id) {
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
    return thread.category === 'QNA';
  };

  const handleDeleteThread = () => {
    if (thread && (user?.id === thread.creator.id || isAdmin)) {
      const savedThreads = localStorage.getItem('threads');
      if (savedThreads) {
        const threads: (Thread | QNAThread)[] = JSON.parse(savedThreads);
        const updatedThreads = threads.filter(t => t.id !== thread.id);
        localStorage.setItem('threads', JSON.stringify(updatedThreads));
        window.location.href = '/';
      }
    }
  };

  const handleLockThread = () => {
    if (thread && (isAdmin || isThreadCreator)) {
      const updatedThread = {
        ...thread,
        locked: !thread.locked,
      };

      const savedThreads = localStorage.getItem('threads');
      if (savedThreads) {
        const threads: (Thread | QNAThread)[] = JSON.parse(savedThreads);
        const updatedThreads = threads.map(t => (t.id === thread.id ? updatedThread : t));
        localStorage.setItem('threads', JSON.stringify(updatedThreads));

        setThread(updatedThread);
      }
    }
  };

  const handleSetParentCommentId = (comment: ThreadComment): void => {
    setParentComment(comment.id);
    setReplyingToComment(comment);
    setComment('');
    if (commentRef.current) {
      commentRef.current.focus();
    }
  };

  if (!thread) {
    return <p className="text-red-500 text-center text-5xl">Loading...</p>;
  }

  return (
    <div className="bg-[#16202a] h-screen font-serif">
      <Navbar />
      <main className="flex items-center bg-[#16202a] justify-center p-10">
        <div className="grid-cols-1 md:grid-cols-2">
          <div className="flex items-center justify-center flex-col">
            <div className="w-[700px] border-2 shadow-xl border-opacity-50 mt-3 p-9 rounded bg-[#16202a]">
              <h1 className="font-bold text-center mt-7 text-5xl text-white">{thread.title}</h1>
              <p className="font-bold text-center text-2xl mt-10 py-3 text-white">{thread.description}</p>
              <hr className="mt-4" />
              <div className="flex justify-end text-white text-sm">
                <p className="mr-2">{new Date(thread.creationDate).toLocaleTimeString()}</p>
                <p>{new Date(thread.creationDate).toLocaleDateString()}</p>
              </div>
              <div className="my-4 p-9">
                {thread.locked && (
                  <p className="text-red-500 text-center font-bold mb-8">This thread is locked and cannot be commented on.</p>
                )}

                {thread.comments
                  .filter(comment => !comment.parentCommentId)
                  .map(comment => (
                    <div key={comment.id} className="mb-4 border-l-4 border-blue-500 pl-4">
                      <p className="bg-slate-200 rounded p-2 text-black font-bold">{comment.content}</p>
                      <p className="text-white flex items-center">
                        {comment.creator.userName}
                        <span className="text-gray-400 text-sm ml-2">{new Date(comment.creationDate).toLocaleDateString()}</span>
                      </p>

                      {thread.comments
                        .filter(reply => reply.parentCommentId === comment.id)
                        .map(reply => (
                          <div key={reply.id} className="ml-6 mt-2 border-l-2 border-gray-400 pl-4">
                            <p className="bg-gray-200 rounded p-2 text-black">{reply.content}</p>
                            <p className="text-white flex items-center justify-between">
                              {reply.creator.userName}
                              <span className="text-gray-400 text-sm">{new Date(reply.creationDate).toLocaleDateString()}</span>
                            </p>
                          </div>
                        ))}

                      <SignedIn>
                        {!thread.locked && (
                          <div className="mt-2">
                            <button
                              className="bg-blue-500 text-white px-3 rounded flex items-center"
                              onClick={() => handleSetParentCommentId(comment)}
                            >
                              <FaReply className="mr-2" />
                            </button>
                          </div>
                        )}
                      </SignedIn>

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
                    <div className="relative flex items-center right-5 mt-2 w-[600px]">
                      <div className="relative flex items-center">
                        <div
                          ref={commentRef}
                          className="text-white m-4 p-5 rounded-md w-[600px] h-[80px] border border-white-300"
                          contentEditable
                          onInput={(e) => setComment((e.target as HTMLDivElement).innerText)}
                        />
                        <button
                          className="absolute right-6 bottom-6 bg-indigo- hover:bg-indigo-700 border text-white px-9 py-1 rounded"
                          onClick={handleAddComment}
                        >
                          {replyingToComment ? 'Reply Comment' : 'Add Comment'}
                        </button>
                      </div>
                    </div>
                  )}

                  {(user?.id === thread.creator.id || isAdmin) && (
                    <div className="flex justify-between mt-4">
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded flex items-center"
                        onClick={handleDeleteThread}
                      >
                        <Trash2 className="mr-2" />
                        Delete Thread
                      </button>
                      <button
                        className="bg-yellow-500 text-white px-3 py-1 rounded flex items-center"
                        onClick={handleLockThread}
                      >
                        {thread.locked ? <LockOpen className="mr-2" /> : <Lock className="mr-2" />}
                        {thread.locked ? "Unlock Thread" : "Lock Thread"}
                      </button>
                    </div>
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
        </div>
      </main>
    </div>
  );
};

export default ThreadDetail;
