import { NextPage } from "next";
import { client } from "src/libs/client";
import { Data, PagesProps } from "src/types";
import { CellarWineLists } from "src/components/CellarWineLists";

export const getStaticProps = async () => {
  const data = await client.get({
    endpoint: "wine",
    queries: {
      limit: 100,
    },
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
    revalidate: 1,
  };
};

const CellarPage: NextPage<PagesProps> = (props) => {
  const data = props.data.contents.filter(
    (data: Data) => data.frontOrCellar[0] === "セラーへ"
  );

  return (
    <div>
      <CellarWineLists
        contents={data}
        sampleImage={props.sampleImage.wineImage.url}
      />
    </div>
  );
};

export default CellarPage;
