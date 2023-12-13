'use client';
import React from 'react';
import { signOut } from 'next-auth/react';

export default function Logout() {
  return (
    <div>
      <button
        className="bg-red-400 text-white text-xl p-1 pl-2 pr-2 hover:bg-red-300 font-fredoka font-{400}"
        onClick={() => signOut()}
      >
        Logout
      </button>
    </div>
  );
}
