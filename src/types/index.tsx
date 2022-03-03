import { Dispatch, SetStateAction } from "react";

export type Data = {
  id: string;
  frontOrCellar: string;
  name: string;
  origin: string;
  variety: string;
  taste: string;
  type: string;
  rank: string;
  bottleCount: number;
  price: number;
  producer?: string;
  image?: {
    url: string;
  };
  remarks?: string;
  orderLists: boolean;
  orderBottleCount: number;
  noInStockBottle: boolean;
  emptyFrontBottle: boolean;
};

export type Props = {
  keyRank?: string;
  keyType?: string;
  contents: Data[];
  sampleImage: string;
};

export type SampleImage = {
  wineImage: {
    url: string;
  };
};

export type PagesProps = {
  data: {
    contents: Data[];
  };
  sampleImage: SampleImage;
  type: string;
  rank: string;
};

export type PropsData = {
  frontBack: string;
  type?: string;
  rank?: string;
  text: string;
};

export type textLists = {
  title: string;
  placeholder: string;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
}[];
