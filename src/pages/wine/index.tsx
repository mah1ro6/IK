import { Links } from 'src/components/Links';

type PropsData = {
  url: string;
  text: string;
};

const WinePage: React.FC = () => {

  const propsData: PropsData[] = [
    {
      url: 'wine/red',
      text: '赤ワイン',
    },
    {
      url: 'wine/white',
      text: '白ワイン',
    },
  ];

  return (
    <div>
      <Links height='h-1/3' propsData={propsData} />
    </div>
  );
};

export default WinePage;
