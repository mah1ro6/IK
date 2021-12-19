import { Links } from "src/components/Links";
import { NextPage } from "next";

type PropsData = {
  url: string;
  text: string;
};

const Rose: NextPage = () => {
  const propsData: PropsData[] = [
    {
      url: "front/rose/oneRank",
      text: "1ランク",
    },
    {
      url: "front/rose/twoRank",
      text: "2ランク",
    },
    {
      url: "front/rose/another",
      text: "その他",
    },
  ];

  return (
    <div>
      <Links height="h-1/4" propsData={propsData} />
    </div>
  );
};

export default Rose;
