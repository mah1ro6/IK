import { NextPage } from "next";
import { client } from "src/libs/client";
import { PagesProps } from "src/types";
import { WineOrderLists } from "src/components/WineOrderLists";

export const getStaticProps = async () => {
  const data = await client.get({
    endpoint: "wine",
    queries: {
      limit: 100,
      filters: "orderLists[equals]true",
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

const OrderPage: NextPage<PagesProps> = (props) => {

  return (
    <WineOrderLists
      contents={props.data.contents}
      sampleImage={props.sampleImage.wineImage.url}
    />
  );
};

export default OrderPage;
