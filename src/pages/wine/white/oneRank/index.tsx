import { client } from 'src/libs/client';
import { WineLists } from 'src/components/WineLists';

export const getStaticProps = async () => {
  const data = await client.get({
    endpoint: `whitewine`,
  });

  const sampleImage = await client.get({
    endpoint: 'wineimage',
  });

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data,
      sampleImage,
    },
  };
};

const OneRank: React.FC = (props: any) => {
  return (
    <WineLists
      keyRank="1ランク"
      data={props.data}
      sampleImage={props.sampleImage.wineImage.url}
    />
  );
};

export default OneRank;
