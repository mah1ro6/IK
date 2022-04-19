import { GetStaticProps } from "next";
import { client } from "src/libs/client";
import { Data } from "src/types";
import { WineOrderLists } from "src/pages/order/_wineOrderLists";
import { backToTopLayout } from "src/layouts/backToTopLayout";
import type { CustomNextPage } from "next";
import { MicroCMSListResponse } from "microcms-js-sdk";

export const getStaticProps: GetStaticProps<
  MicroCMSListResponse<Data>
> = async () => {
  const data = await client.getList({
    endpoint: "wine",
    queries: {
      limit: 1000,
      filters: "orderLists[equals]true",
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

const OrderPage: CustomNextPage<MicroCMSListResponse<Data>> = (props) => {
  return <WineOrderLists contents={props.contents} />;
};

export default OrderPage;

OrderPage.getLayout = backToTopLayout;
