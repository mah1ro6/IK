import type { NextPage } from 'next';
import Link from 'next/link';
import 'tailwindcss/tailwind.css';

const Home: NextPage = () => {
  return (
    <div className="h-screen mx-auto w-5/6">
      <div className="h-screen text-center flex flex-col justify-around items-center">
        <Link href="/wine">
          <a className="w-2/3 h-1/3 flex justify-center items-center bg-blue-300 rounded-2xl font-mono text-4xl text-white tracking-wider shadow-md">
            ワイン
          </a>
        </Link>
        <Link href="/whisky">
          <a className="w-2/3 h-1/3 flex justify-center items-center bg-blue-300 rounded-2xl font-mono text-4xl text-white tracking-wider shadow-md">
            ウイスキー
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Home;
