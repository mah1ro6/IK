import type { NextPage } from "next";
import { Links } from "src/components/Links";

type PropsData = {
  url: string;
  text: string;
};

const Home: NextPage = () => {
  const propsData: PropsData[] = [
    {
      url: "front",
      text: "表に出ているワイン",
    },
    {
      url: "back",
      text: "セラーのワイン",
    },
  ];

  return <Links height="h-1/3" propsData={propsData} />;
};

export default Home;
