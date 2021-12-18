import { Links } from "src/components/Links";
import { NextPage } from "next";

type PropsData = {
  url: string;
  text: string;
};

const Red: NextPage = () => {
  const propsData: PropsData[] = [
    {
      url: "front/red/oneRank",
      text: "1ランク",
    },
    {
      url: "front/red/twoRank",
      text: "2ランク",
    },
    {
      url: "front/red/another",
      text: "その他",
    },
  ];

  return (
    <div>
      <Links height="h-1/4" propsData={propsData} />
    </div>
  );
};

export default Red;
