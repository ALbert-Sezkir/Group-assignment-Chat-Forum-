'use client'
import ListThreads from "@/components/ListThreads";
import Navbar from "./_components/navbar";
import { SignedOut } from "@clerk/nextjs";

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
        

        <SignedOut>
  <div className="text-center text-red-500 mt-4 border-white border-2 p-4">
    <p className="text-2xl">Please Sign in to Vibe & Talk!</p>
    <p className="text-2xl">Sign in with:</p>
    <p>email: gemajab567@craftapk.com & password: chatforum12345</p>
  </div>
</SignedOut>

        
            
          
        
    </main>
  );
}


