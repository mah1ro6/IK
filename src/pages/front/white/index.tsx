import { Links } from "src/components/Links";
import { NextPage } from "next";

type PropsData = {
  url: string;
  text: string;
};

const White: NextPage = () => {
  const propsData: PropsData[] = [
    {
      url: "front/white/oneRank",
      text: "1ランク",
    },
    {
      url: "front/white/twoRank",
      text: "2ランク",
    },
    {
      url: "front/white/another",
      text: "その他",
    },
  ];

  return (
    <div>
      <Links height="h-1/4" propsData={propsData} />
    </div>
  );
};

export default White;
