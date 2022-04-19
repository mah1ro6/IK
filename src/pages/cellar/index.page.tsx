import { CustomNextPage, GetStaticProps } from "next";
import { client } from "src/libs/client";
import { Data } from "src/types";
import { CellarWineLists } from "src/pages/cellar/cellarWineLists";
import { backToTopLayout } from "src/layouts/backToTopLayout";
import { MicroCMSListResponse } from "microcms-js-sdk";

export const getStaticProps: GetStaticProps<
  MicroCMSListResponse<Data>
> = async () => {
  const data = await client.getList<Data>({
    endpoint: "wine",
    queries: {
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

const CellarPage: CustomNextPage<MicroCMSListResponse<Data>> = (props) => {
  const data = props?.contents.filter(
    (data: Data) => data.cellarBottleCount > 0
  );

  return <CellarWineLists contents={data} />;
};

export default CellarPage;

CellarPage.getLayout = backToTopLayout;
