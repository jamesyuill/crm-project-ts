import Logo from '@/components/Logo';
import Tagline from '@/components/Tagline';
import { GiNotebook } from 'react-icons/gi';

export default function Home() {
  return (
    <main className="flex flex-col gap-3 p-2 w-[100vw] h-[80%] justify-center items-center">
      <div className="absolute mt-10 left-30 opacity-30 z-[0]">
        <GiNotebook size={360} color={'#bfdbfe'} />
      </div>
      <div className="flex flex-col justify-center items-center z-[2]">
        <Logo />
        <Tagline />
      </div>
    </main>
  );
}
