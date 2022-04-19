import { FrontWineLists } from "src/pages/front/[type]/[rank]/frontWineLists";
import { client } from "src/libs/client";
import { CustomNextPage, GetStaticPaths, GetStaticProps } from "next";
import { Data } from "src/types";
import { backToTopLayout } from "src/layouts/backToTopLayout";
import { MicroCMSListResponse } from "microcms-js-sdk";
import { useRouter } from "next/router";

export const getStaticPaths: GetStaticPaths<{
  rank: string;
}> = async () => {
  const data = await client.getList<Data>({
    endpoint: "wine",
    queries: {
      limit: 1000,
    },
  });

  const ranks = data.contents.map(
    (data: Data) => `/front/${data.type[0]}/${data.rank[0]}`
  );

  return {
    paths: ranks,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<
  MicroCMSListResponse<Data>,
  { rank: string }
> = async (ctx) => {
  if (!ctx.params) {
    return {
      notFound: true,
    };
  }

  const data = await client.getList<Data>({
    endpoint: "wine",
    queries: {
      filters: `rank[contains]${ctx.params.rank}`,
      limit: 1000,
    },
  });

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: data,
    revalidate: 3,
  };
};

const Rank: CustomNextPage<MicroCMSListResponse<Data>> = (props) => {
  const router = useRouter();
  const data = props.contents?.filter(
    (data: Data) => data.frontBottleCount > 0
  );

  return (
    <FrontWineLists
      keyRank={props.contents[0].rank[0]}
      keyType={router.query.type as string}
      contents={data}
    />
  );
};

export default Rank;

Rank.getLayout = backToTopLayout;
