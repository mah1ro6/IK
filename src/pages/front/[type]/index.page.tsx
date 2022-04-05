import { Links } from "src/components/Links";
import { CustomNextPage } from "next";
import { useRouter } from "next/router";
import { PropsData } from "src/types";
import { backToTopLayout } from "src/layouts/backToTopLayout";

const Type: CustomNextPage = () => {
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

  return <Links height="h-1/4" propsData={propsData} />;
};

export default Type;

Type.getLayout = backToTopLayout;
