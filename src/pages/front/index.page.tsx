import { Links } from "src/components/Links";
import { CustomNextPage } from "next";
import { PropsData } from "src/types";
import { backToTopLayout } from "src/layouts/backToTopLayout";

const FrontPage: CustomNextPage = () => {
  const propsData: PropsData[] = [
    {
      frontBack: "front",
      type: "red",
      text: "赤ワイン",
    },
    {
      frontBack: "front",
      type: "white",
      text: "白ワイン",
    },
    {
      frontBack: "front",
      type: "rose",
      text: "ロゼ",
    },
    {
      frontBack: "front",
      type: "sparkling",
      text: "スパーク",
    },
  ];

  return (
    <>
      <Links height="h-1/3" propsData={propsData} />
    </>
  );
};

export default FrontPage;

FrontPage.getLayout = backToTopLayout;
