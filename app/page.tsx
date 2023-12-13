import Logo from '@/components/Logo';
import Tagline from '@/components/Tagline';

export default function Home() {
  return (
    <main className="flex flex-col gap-3 p-4 w-[100vw] h-[80%] justify-center items-center">
      <Logo />
      <Tagline />
    </main>
  );
}
