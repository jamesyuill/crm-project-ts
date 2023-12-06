'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import Logout from './Logout';
import NavGreeting from './NavGreeting';
import Link from 'next/link';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-row justify-between items-center h-15 w-[100%] min-w-[350px] p-5 bg-blue-200/60">
      <Link href="/" id="logo" className="font-semibold text-lg">
        Project Todo
      </Link>
      <nav className="flex flex-row items-center gap-5">
        {session ? (
          <>
            <NavGreeting />
            <Logout />
          </>
        ) : (
          <>
            <a href="/login" className="hover:border-b-2 border-red-400 h-6 ">
              Login
            </a>
            <a
              href="/signup"
              className="bg-blue-400 pl-1 pr-1 hover:border-b-2 border-red-400 h-6 "
            >
              Sign Up
            </a>
          </>
        )}
      </nav>
    </div>
  );
}
