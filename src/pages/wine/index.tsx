import { client } from '../../libs/client';
import { Links } from '../../components/Links';

export const getStaticProps = async () => {
  const data = await client.get({
    endpoint: 'wine',
  });

  return {
    props: {
      data,
    },
  };
};

type PropsData = {
  url: string;
  text: string;
};

const WinePage: React.FC = (props: any) => {
  const { data } = props;

  console.log(data.contents[0]);

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
