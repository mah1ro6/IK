export type Data = {
  id: string;
  name: string;
  origin: string;
  variety: string;
  taste: string;
  type: string;
  rank: string;
  producer?: string;
  image?: {
    url: string;
  };
  remarks?: string;
};

export type Props = {
  keyRank: string;
  keyType: string;
  data: any;
  // data: {
  //   contents: Data[];
  // };
  sampleImage: string;
};
