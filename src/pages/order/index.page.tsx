import { GetStaticProps } from "next";
import { client } from "src/libs/client";
import { PagesProps } from "src/types";
import { WineOrderLists } from "src/pages/order/_wineOrderLists";
import { backToTopLayout } from "src/layouts/backToTopLayout";
import type { CustomNextPage } from "next";

export const getStaticProps: GetStaticProps<
  Pick<PagesProps, "data">
> = async () => {
  const data = await client.get({
    endpoint: "wine",
    queries: {
      limit: 100,
      filters: "orderLists[equals]true",
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
    },
    revalidate: 3,
  };
};

const OrderPage: CustomNextPage<PagesProps> = (props) => {
  return <WineOrderLists contents={props.data.contents} />;
};

export default OrderPage;

OrderPage.getLayout = backToTopLayout;
