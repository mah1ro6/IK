import { FrontWineLists } from "src/pages/front/[type]/[rank]/frontWineLists";
import { client } from "src/libs/client";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { PagesProps, Data } from "src/types";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "node:querystring";

export type Params = ParsedUrlQuery & Pick<Data, "type" | "rank">;

export const getStaticPaths: GetStaticPaths<Params> = async () => {
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

export const getStaticProps: GetStaticProps<PagesProps, Params> = async ({
  params,
}) => {
  const { type } = params as Params;
  const { rank } = params as Params;

  const data = await client.get({
    endpoint: "wine",
    queries: {
      limit: 100,
    },
  });

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data,
      type,
      rank,
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
    (data: Data) => data.frontBottleCount > 0
  );

  return (
    <FrontWineLists keyRank={props.rank} keyType={props.type} contents={data} />
  );
};

export default Rank;
