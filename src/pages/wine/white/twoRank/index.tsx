import { WineLists } from 'src/components/WineLists';
import { client } from 'src/libs/client';

export const getStaticProps = async () => {
  const data = await client.get({
    endpoint: `whitewine`,
  });

  const sampleImage = await client.get({
    endpoint: 'wineimage',
  });

  return {
    props: {
      data,
      sampleImage,
    },
  };
};

const TwoRank: React.FC = (props: any) => {
  return (
    <WineLists
      keyRank="2ランク"
      data={props.data}
      sampleImage={props.sampleImage.wineImage.url}
    />
  );
};

export default TwoRank;
