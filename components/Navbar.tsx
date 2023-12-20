'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import Logout from './Logout';
import NavGreeting from './NavGreeting';
import Link from 'next/link';
import { GiNotebook } from 'react-icons/gi';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-row justify-between items-center h-15 w-[100%] min-w-[350px] p-5 bg-blue-300/60">
      <Link
        href="/"
        id="logo"
        className=" flex flex-row gap-3 drop-shadow-[0_25px_25px_rgba(0,0,0,0.50)] font-medium text-3xl font-fredoka text-blue-500 items-center"
      >
        Project Todo
        <div className="mt-1">
          <GiNotebook size={30} color={'#3b82f6'} />
        </div>
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
