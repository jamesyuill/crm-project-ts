'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError('invalid credentials');
        return;
      }
      router.replace('dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="flex flex-col justify-center align-center  h-[90vh] ml-[35%]">
      <div className="flex flex-col gap-3 border-solid border-2 border-slate-600 w-[300px] p-3 ">
        <div className="mb-4">
          <h2 className="font-medium">Login</h2>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-[100%]  gap-3"
          >
            <label htmlFor="email">Email:</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="border-solid border-[1px] border-slate-300 p-[0.2rem]"
              type="email"
              id="email"
              placeholder="john.smith@example.com"
            />
            <label htmlFor="password">Password:</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="...shhh!"
              className="border-solid border-[1px] border-slate-300 p-[0.2rem]"
            />
            <button
              type="submit"
              className="border-solid border-2 border-slate-500"
            >
              Login
            </button>
            {error && <div className="bg-red-500 text-white">{error}</div>}
          </form>
        </div>
      </div>
    </main>
  );
}
