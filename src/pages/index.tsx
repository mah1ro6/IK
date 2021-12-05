import type { NextPage } from 'next';
import 'tailwindcss/tailwind.css';
import { client } from '../libs/client';

export const getStaticProps = async () => {
  const data = await client.get({
    endpoint: 'test',
  });

  return {
    props: {
      data,
    }
  };
};

const Home: NextPage = (props: any) => {
  const { data } = props;

  console.log(data);

  return (
    <div>
      コンポーネントをここに配置するよ
    </div>
  );
};

export default Home;
