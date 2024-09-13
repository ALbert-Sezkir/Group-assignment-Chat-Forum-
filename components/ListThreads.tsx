import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { SignedIn, useUser } from '@clerk/clerk-react';
import { Trash2, Lock, LockOpen } from 'lucide-react';

const ADMIN_USER_ID = "user_2le5oJ8jdX29j9GvkxM6KRmDG2D";

function ListThreads() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser(); // Hämta den inloggade användaren
  const isAdmin = user?.id === ADMIN_USER_ID; // Kontrollera om användaren är admin

  useEffect(() => {
    const savedThreads = localStorage.getItem('threads');
    if (savedThreads) {
      setThreads(JSON.parse(savedThreads));
    } else {
      setError('Inga trådar hittades i localStorage.');
    }
  }, []);

  const deleteThread = (id: number) => {
    const updatedThreads = threads.filter(thread => thread.id !== id);
    setThreads(updatedThreads);
    localStorage.setItem('threads', JSON.stringify(updatedThreads));
  };

  const toggleLockThread = (id: number) => {
    const updatedThreads = threads.map(thread => {
      if (thread.id === id) {
        return { ...thread, locked: !thread.locked };
      }
      return thread;
    });
    setThreads(updatedThreads);
    localStorage.setItem('threads', JSON.stringify(updatedThreads));
  };

  return (
    <main className="border-2 flex items-center justify-center rounded p-10 shadow-xl bg-[#16202a] h-auto">
      <div className="w-full max-w-4xl border-2 border-white rounded p-6 shadow-xl">
        <div className="text-white flex items-center justify-center flex-col">
          {error ? (
            <p className="text-red-500 text-xs italic">{error}</p>
          ) : (
            threads.map(thread => (
              <div key={thread.id} className="flex justify-between rounded items-center mb-4 p-4 border border-white w-[800px]">
                <Link href={`/threads/${thread.id}`} className="flex-1">{thread.title}</Link>
                <p className="mt-2 mx-4 text-sm">{thread.category}</p>
                <p className="text-sm mx-4 text-slate-500">{new Date(thread.creationDate).toLocaleString()}</p>

                <SignedIn>
                  <div className="flex space-x-5">
                    {/* Kontrollera om användaren är admin eller skaparen av tråden */}
                    {(isAdmin || user?.id === thread.creator.id) && (
                      <>
                        {isAdmin && (
                          <button
                            className="flex items-center w-10 h-10 mt-2 bg-red-500 text-white px-3 rounded-full"
                            onClick={() => deleteThread(thread.id)}
                          >
                            <Trash2 />
                          </button>
                        )}
                        {isAdmin && (
                          <button
                            className={`flex items-center mt-2 text-white w-10 h-10 px-3 rounded-full ${thread.locked ? 'bg-green-500' : 'bg-red-500'}`}
                            onClick={() => toggleLockThread(thread.id)}
                          >
                            {thread.locked ? <LockOpen /> : <Lock />}
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </SignedIn>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}

export default ListThreads;