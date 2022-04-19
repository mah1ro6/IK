import { Links } from "src/components/Links";
import { CustomNextPage, GetStaticPaths, GetStaticProps } from "next";
import { Data, PropsData } from "src/types";
import { backToTopLayout } from "src/layouts/backToTopLayout";
import { client } from "src/libs/client";
import { MicroCMSDate, MicroCMSListResponse } from "microcms-js-sdk";

export const getStaticPaths: GetStaticPaths<{ type: string }> = async () => {
  const data = await client.getList<Data>({
    endpoint: "wine",
    queries: { limit: 1000 },
  });

  const types = data.contents.map((data: Data) => `/front/${data.type[0]}`);

  return {
    paths: types,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<
  Data & MicroCMSDate,
  { type: string }
> = async (ctx) => {
  if (!ctx.params) {
    return {
      notFound: true,
    };
  }

  const data = await client.getObject<Data>({
    endpoint: "wine",
    queries: {
      filters: `type[contains]${ctx.params.type}`,
      limit: 1000,
    },
  });

  return {
    props: data,
  };
};

const Type: CustomNextPage<MicroCMSListResponse<Data>> = (props) => {
  const propsData: PropsData[] = [
    {
      frontBack: "front",
      type: `${props.contents[0].type}`,
      rank: "oneRank",
      text: "1ランク",
    },
    {
      frontBack: "front",
      type: `${props.contents[0].type}`,
      rank: "twoRank",
      text: "2ランク",
    },
    {
      frontBack: "front",
      type: `${props.contents[0].type}`,
      rank: "another",
      text: "その他",
    },
  ];

  return <Links height="h-1/4" propsData={propsData} />;
};

export default Type;

Type.getLayout = backToTopLayout;
