import { WineLists } from 'src/components/WineLists';
import { client } from 'src/libs/client';

export const getStaticProps = async () => {
  const data = await client.get({
    endpoint: `redwine`,
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
