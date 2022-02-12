import { WineLists } from "src/components/WineLists";
import { client } from "src/libs/client";
import { NextPage } from "next";
import { PagesProps, Data } from "src/types";
import { useRouter } from "next/router";

export type Params = {
  params: {
    type: string;
    rank: string;
  };
};

export const getStaticPaths = async () => {
  const data = await client.get({
    endpoint: "wine",
  });

  const paths = data.contents.map((data: Data) => ({
    params: { type: data.type[0], rank: data.rank[0] },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params }: Params) => {
  const { type } = params;
  const { rank } = params;

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
      type: type || null,
      rank: rank || null,
    },
    revalidate: 1,
  };
};

const Rank: NextPage<PagesProps> = (props) => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <p className="flex items-center justify-center h-screen text-gray-700 font-mono text-4xl">
        Loading...
      </p>
    );
  }

  const data = props.data.contents.filter(
    (data: Data) => data.frontOrCellar[0] === "表へ"
  );

  return (
    <WineLists
      keyRank={props.rank}
      keyType={props.type}
      contents={data}
      sampleImage={props.sampleImage.wineImage.url}
    />
  );
};

export default Rank;
