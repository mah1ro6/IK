import { WineLists } from 'src/components/WineLists';
import { client } from 'src/libs/client';

export const getStaticProps = async () => {
  const data = await client.get({
    endpoint: `redwine`,
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

const Another: React.FC = (props: any) => {
  return (
    <WineLists
      keyRank="その他"
      data={props.data}
      sampleImage={props.sampleImage.wineImage.url}
    />
  );
};

export default Another;
