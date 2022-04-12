import { FrontWineLists } from "src/pages/front/[type]/[rank]/frontWineLists";
import { client } from "src/libs/client";
import { CustomNextPage, GetStaticPaths, GetStaticProps } from "next";
import { PagesProps, Data } from "src/types";
import { backToTopLayout } from "src/layouts/backToTopLayout";


export const getStaticPaths: GetStaticPaths<Pick<Data, "type" | "rank">> = async () => {
  const data = await client.get({
    endpoint: "wine",
  });

  const paths = data.contents.map((data: Data) => ({
    params: { type: data.type[0], rank: data.rank[0] },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<
  PagesProps,
  { type: string; rank: string }
> = async ({ params }) => {
  const data = await client.get({
    endpoint: "wine",
    queries: {
      limit: 100,
    },
  });

  if (!data || !params) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data,
      rank: params.rank,
      type: params.rank,
    },
    revalidate: 3,
  };
};

const Rank: CustomNextPage<PagesProps> = (props) => {

  const data = props.data.contents.filter(
    (data: Data) => data.frontBottleCount > 0
  );

  return (
    <FrontWineLists keyRank={props.rank} keyType={props.type} contents={data} />
  );
};

export default Rank;

Rank.getLayout = backToTopLayout;
