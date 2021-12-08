import Link from 'next/link';

const Red: React.FC = () => {
  return (
    <div>
      <Link href="/wine/red/oneRank">
        <a>1ランク</a>
      </Link>
      <Link href="/wine/red/twoRank">
        <a>2ランク</a>
      </Link>
      <Link href="/wine/red/another">
        <a>その他</a>
      </Link>
    </div>
  );
};

export default Red;
