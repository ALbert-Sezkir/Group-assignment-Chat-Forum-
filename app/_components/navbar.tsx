import Link from "next/link"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"

const Navbar = () => {
  return (
    <div>
      <ul className="flex justify-center items-center text-white text-lg font-semibold py-8 px-4 gap-x-3 bg-[#16202a] ">
        <li>
    <Link href="/">
      Home
    </Link>
  </li>
  <li>
    <Link href="/create">
      Create
    </Link>
  </li>
  <SignedOut>
    <li>
      <SignInButton />
    </li>
  </SignedOut>
  <SignedIn>
    <li className="ml-4">
      <UserButton />
    </li>
  </SignedIn>
</ul>
    </div>

   
  )
}
<div>hej</div>
export default Navbar

