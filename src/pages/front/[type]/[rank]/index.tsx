import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, PreviewData } from "next";
import { WineLists } from "src/components/WineLists";
import { client } from "src/libs/client";
import { NextPage } from "next";
import { PagesProps, Data } from "src/types";
import { useRouter } from "next/router";

export const getStaticPaths: GetStaticPaths = async () => {
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

export const getStaticProps: GetStaticProps<PagesProps> = async (ctx: any) => {
  const { type } = ctx.params;
  const { rank } = ctx.params;

  const data = await client.get({
    endpoint: "wine",
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

  return (
    <WineLists
      keyRank={props.rank}
      keyType={props.type}
      contents={props.data.contents}
      sampleImage={props.sampleImage.wineImage.url}
    />
  );
};

export default Rank;
