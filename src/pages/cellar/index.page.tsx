import { CustomNextPage, GetStaticProps } from "next";
import { client } from "src/libs/client";
import { Data, PagesProps } from "src/types";
import { CellarWineLists } from "src/pages/cellar/cellarWineLists";
import { backToTopLayout } from "src/layouts/backToTopLayout";

export const getStaticProps: GetStaticProps<
  Pick<PagesProps, "data">
> = async () => {
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
    },
    revalidate: 1,
  };
};

const CellarPage: CustomNextPage<PagesProps> = (props) => {
  const data = props.data.contents.filter(
    (data: Data) => data.cellarBottleCount > 0
  );

  return <CellarWineLists contents={data} />;
};

export default CellarPage;

CellarPage.getLayout = backToTopLayout;
