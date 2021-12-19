import { Links } from "src/components/Links";
import { NextPage } from "next";

type PropsData = {
  url: string;
  text: string;
};

const Sparkling: NextPage = () => {
  const propsData: PropsData[] = [
    {
      url: "front/sparkling/oneRank",
      text: "1ランク",
    },
    {
      url: "front/sparkling/twoRank",
      text: "2ランク",
    },
    {
      url: "front/sparkling/another",
      text: "その他",
    },
  ];

  return (
    <div>
      <Links height="h-1/4" propsData={propsData} />
    </div>
  );
};

export default Sparkling;
