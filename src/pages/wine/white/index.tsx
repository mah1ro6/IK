import { Links } from '../../../components/Links';

type PropsData = {
  url: string;
  text: string;
};

const White: React.FC = () => {
  const propsData: PropsData[] = [
    {
      url: 'wine/white/oneRank',
      text: '1ランク',
    },
    {
      url: 'wine/white/twoRank',
      text: '2ランク',
    },
    {
      url: 'wine/white/another',
      text: 'その他',
    },
  ];

  return (
    <div>
      <Links height="h-1/4" propsData={propsData} />
    </div>
  );
};

export default White;
