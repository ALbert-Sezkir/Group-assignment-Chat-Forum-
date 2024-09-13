'use client'
import ListThreads from "@/components/ListThreads";
import Navbar from "./_components/navbar";

export default function Home() {
  return (
    <main className="bg-[#16202a] h-screen font-serif">
      <Navbar/>

      <div className="my-4">
          <h1 className="text-6xl font-semibold mt-10 text-center text-white">Vibe & Talk  </h1>
          <p className="flex justify-center font-semibold mt-12 text-3xl text-white">Forum Threads</p>
        </div>
      
        <div className="font-bold text-start text-xl py-9 rounded-sm ">
            <ListThreads />
        </div>
        <div>
          <div>

            
          </div>
        </div>
    </main>
  );
}

<div>hej</div>

