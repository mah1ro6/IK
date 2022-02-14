import type { NextPage } from "next";
import { Links } from "src/components/Links";
import { PropsData } from "src/types";

const Home: NextPage = () => {
  const propsData: PropsData[] = [
    {
      frontBack: "front",
      text: "表に出ているワイン",
    },
    {
      frontBack: "cellar",
      text: "セラーのワイン",
    },
    {
      frontBack: "order",
      text: "発注リスト",
    },
  ];

  return <Links height="h-1/4" propsData={propsData} />;
};

export default Home;
