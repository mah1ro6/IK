import Link from 'next/link';

const White: React.FC = () => {
  return (
    <div>
      <Link href="/wine/white/oneRank">
        <a>1ランク</a>
      </Link>
      <Link href="/wine/white/twoRank">
        <a>2ランク</a>
      </Link>
      <Link href="/wine/white/another">
        <a>その他</a>
      </Link>
    </div>
  );
};

export default White;
