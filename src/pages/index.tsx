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
  ];

  return <Links height="h-1/3" propsData={propsData} />;
};

export default Home;
