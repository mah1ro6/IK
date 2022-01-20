import { GetStaticProps } from "next";
import { WineLists } from "src/components/WineLists";
import { client } from "src/libs/client";
import { NextPage } from "next";
import { keyOneRank, red } from "src/util";
import { PagesProps } from "src/types";


export const getStaticProps: GetStaticProps<PagesProps> = async () => {
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

const OneRank: NextPage<PagesProps> = (props) => {
  console.log(props.data);

  return (
    <WineLists
      keyRank={keyOneRank}
      keyType={red}
      contents={props.data.contents}
      sampleImage={props.sampleImage.wineImage.url}
    />
  );
};

export default OneRank;
