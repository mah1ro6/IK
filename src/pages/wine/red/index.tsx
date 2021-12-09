import { Links } from 'src/components/Links';

type PropsData = {
  url: string;
  text: string;
};

const Red: React.FC = () => {
  const propsData: PropsData[] = [
    {
      url: 'wine/red/oneRank',
      text: '1ランク',
    },
    {
      url: 'wine/red/twoRank',
      text: '2ランク',
    },
    {
      url: 'wine/red/another',
      text: 'その他',
    },
  ];

  return (
    <div>
      <Links height="h-1/4" propsData={propsData} />
    </div>
  );
};

export default Red;
