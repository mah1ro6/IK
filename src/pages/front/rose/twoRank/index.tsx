import { GetStaticProps } from "next";
import { WineLists } from "src/components/WineLists";
import { client } from "src/libs/client";
import { NextPage } from "next";
import { keyTwoRank, rose } from "src/util";

type Data = {
  contents: {
    id: string;
    name: string;
    origin: string;
    variety: string;
    taste: string;
    rank: string;
    producer?: string;
    image?: string;
    remarks?: string;
  };
};

type SampleImage = {
  wineImage: {
    url: string;
  };
};

type Props = {
  data: Data[];
  sampleImage: SampleImage;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = await client.get({
    endpoint: `wine`,
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

const TwoRank: NextPage<Props> = (props) => {
  return (
    <WineLists
      keyRank={keyTwoRank}
      keyType={rose}
      data={props.data}
      sampleImage={props.sampleImage.wineImage.url}
    />
  );
};

export default TwoRank;
