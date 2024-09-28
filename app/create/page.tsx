import { SignedIn, SignedOut } from '@clerk/nextjs';
import CreateThread from '../../components/CreateThread';
import Navbar from "../_components/navbar";


export default function Create() {  return (
    <div className="bg-[#16202a] min-h-screen font-serif">

       <Navbar/>

            <div className="my-4">
          <h1 className="text-6xl font-semibold mt-10 text-center text-white">Create Thread  </h1>
          <p className="flex justify-center font-semibold mt-12 text-3xl text-white">Begin topic</p>
        </div>
            
            

            <SignedIn>
            <CreateThread /> 
            </SignedIn>

            <SignedOut>
        <div className="text-center text-red-500 mt-10 border-white border-2 p-4">
          <p className="text-2xl">Sign in to create threads</p>
        </div>
      </SignedOut>

          </div>
        
  );
}



        