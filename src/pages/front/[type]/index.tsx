import { Links } from "src/components/Links";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { PropsData } from "src/types";

const Type: NextPage = () => {
  const router = useRouter();

  const propsData: PropsData[] = [
    {
      frontBack: "front",
      type: `${router.query.type}`,
      rank: "oneRank",
      text: "1ランク",
    },
    {
      frontBack: "front",
      type: `${router.query.type}`,
      rank: "twoRank",
      text: "2ランク",
    },
    {
      frontBack: "front",
      type: `${router.query.type}`,
      rank: "another",
      text: "その他",
    },
  ];

  return (
    <div>
      <Links height="h-1/4" propsData={propsData} />
    </div>
  );
};

export default Type;
