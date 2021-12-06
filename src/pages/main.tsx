import Link from 'next/link';

const Main: React.FC = () => {
  return (
    <div>
      <Link href="/wine">
        <a>ワイン</a>
      </Link>
      <Link href="/whisky">
        <a>ウイスキー</a>
      </Link>
    </div>
  );
};

export default Main;
