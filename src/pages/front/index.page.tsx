import { Links } from "src/components/Links";
import { NextPage } from "next";
import { PropsData } from "src/types";

const FrontPage: NextPage = () => {
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
