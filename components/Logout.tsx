'use client';
import React from 'react';
import { signOut } from 'next-auth/react';

export default function Logout() {
  return (
    <div>
      <button className="bg-red-700 text-white p-1" onClick={() => signOut()}>
        Logout
      </button>
    </div>
  );
}
