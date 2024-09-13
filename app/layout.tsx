
// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import { ClerkProvider,SignInButton,SignedIn,SignedOut,UserButton, SignIn
// } from '@clerk/nextjs'

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <ClerkProvider>
//       <html lang="en">
//         <body className = {inter.className}>
//           <header className="flex justify-between">
//             <UserButton showName/>
//           </header>

//           <main>
//             <SignedOut>
//                   {children}
          
           
//               <SignIn routing="hash"/>

             

//             </SignedOut>

//           </main>
//           <p className="flex justify-center mt-4 text-xs text-slate-200">@2024 All rights reserved by Albert Sezkir</p>
      
          
//         </body>
//       </html>
//     </ClerkProvider>
//   )
// }

import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          
          {children}

        </body>
      </html>
    </ClerkProvider>
  )
}

<div>hej</div>

