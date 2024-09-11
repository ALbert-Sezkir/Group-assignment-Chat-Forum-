import React, { ReactNode } from 'react';

interface LayoutProps { children?: ReactNode }

function AuthLayout({ children }: LayoutProps) {
  return (

    <main className="bg-[#26313c] h-screen flex items-center justify-center p-10">
    <div className="w-full h-full grid-cols-1 bg-blue md:grid-cols-2">
      <div className="bg-[#16202a] h-full text-white flex items-center justify-center flex-col">
        <div className="my-4">
          <h1 className="text-3xl font-semib mb-1">Sign in to Chat-Forum</h1>
          <p className="flex justify-center mt-2 text-xs text-slate-400">Sign in to your account</p>
        </div>
        
    <div className="flex justify-center mt-2 ">{children}</div>
        <p className="mt-4 text-xs text-slate-200">@2024 All rights reserved by Albert</p>
      </div>
    </div>
  </main>
  ) 
  
}

export default AuthLayout;

