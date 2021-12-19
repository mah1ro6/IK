import { GetStaticProps } from "next";
import { WineLists } from "src/components/WineLists";
import { client } from "src/libs/client";
import { NextPage } from "next";

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
    endpoint: `sparklingwine`,
  });

  const sampleImage = await client.get({
    endpoint: "wineimage",
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

const Another: NextPage<Props> = (props) => {
  return (
    <WineLists
      keyRank="その他"
      data={props.data}
      sampleImage={props.sampleImage.wineImage.url}
    />
  );
};

export default Another;
