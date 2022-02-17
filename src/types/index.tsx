export type Data = {
  id: string;
  frontOrCellar: string;
  name: string;
  origin: string;
  variety: string;
  taste: string;
  type: string;
  rank: string;
  price?: number;
  producer?: string;
  image?: {
    url: string;
  };
  remarks?: string;
  orderLists: boolean;
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
