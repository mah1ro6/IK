import { GetStaticProps } from 'next';
import { WineLists } from 'src/components/WineLists';
import { client } from 'src/libs/client';

type Data = {
  name: string;
  origin: string;
  variety: string;
  taste: string;
  rank: string;
  producer?: string;
  image?: string;
  remarks?: string;
};

type SampleImage = {
  wineImage: {
    url: string;
  };
};

type Props = {
  data: Data;
  sampleImage: SampleImage;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
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

const TwoRank: React.FC<Props> = (props) => {
  return (
    <WineLists
      keyRank="2ランク"
      data={props.data}
      sampleImage={props.sampleImage.wineImage.url}
    />
  );
};

export default TwoRank;
