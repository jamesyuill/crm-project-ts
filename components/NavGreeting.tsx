'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

export default function NavGreeting() {
  const { data: session } = useSession();

  return (
    <div className="flex gap-3">
      <div>Hi {session?.user?.name}!</div>
      <div>
        <Link href="/dashboard" className="hover:border-b-2 border-red-400 h-6">
          My Boards
        </Link>
      </div>
    </div>
  );
}
