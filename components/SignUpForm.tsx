'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUpForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const formRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name || !email || !password) {
      setError('All fields are necessary');
    }

    try {
      const resUserExists = await fetch('api/userExists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError('User already exists');
        return;
      }

      const res = await fetch('api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.ok) {
        formRef.current.reset();
        router.push('/login');
      } else {
        console.log('user registration failed');
      }
    } catch (error) {
      console.log('Error during registration: ', error);
    }
  };

  return (
    <div className="flex flex-col justify-center align-center h-[90vh] ml-[35%]">
      <div className="flex flex-col gap-3 border-solid border-2 border-slate-600 w-[300px] p-3 ">
        <div className="mb-4">
          <h2 className="font-medium">Sign Up</h2>
          <form
            ref={formRef}
            className="flex flex-col w-[100%]  gap-3"
            onSubmit={handleSubmit}
          >
            <label htmlFor="fullName">Full Name:</label>
            <input
              className="border-solid border-[1px] border-slate-300 p-[0.2rem]"
              type="text"
              id="fullName"
              placeholder="John Smith"
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="email">Email:</label>
            <input
              className="border-solid border-[1px] border-slate-300 p-[0.2rem]"
              type="email"
              id="email"
              placeholder="john.smith@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              className="border-solid border-[1px] border-slate-300 p-[0.2rem]"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="border-solid border-2 border-slate-500"
            >
              Sign Up
            </button>

            {error && <div className="bg-red-500 text-white">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}
