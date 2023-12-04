'use client';
import { useSession } from 'next-auth/react';
import React from 'react';

export default function NavGreeting() {
  const { data: session } = useSession();

  return <div>Hi {session?.user?.name}!</div>;
}
