import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex gap-3 p-4">
      <h1>Home</h1>
      <Link href="/dashboard">Dashboard</Link>
    </main>
  );
}
