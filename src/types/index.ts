import { Dispatch, SetStateAction } from "react";

export type Data = {
  id: string;
  name: string;
  origin: string;
  variety: string;
  taste: string;
  type: string;
  rank: string;
  frontBottleCount: number;
  cellarBottleCount: number;
  price: number;
  producer?: string;
  image?: {
    url: string;
  };
  remarks?: string;
  orderLists: boolean;
  orderBottleCount: number;
};

export type KeyProps = {
  keyRank?: string;
  keyType?: string;
  contents: Data[];
};

export type PropsData = {
  frontBack: string;
  type?: string;
  rank?: string;
  text: string;
};

export type TextLists = {
  title: string;
  placeholder: string;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
}[];

type WineItem = {
  title: string;
  titleData: string | number | null | undefined;
};

export type State = {
  onPatch: boolean;
  wineItems: WineItem[];
};

export type Action = {
  type: "patchOff" | "patchOn" | "handleInputChange";
  index?: number;
  value?: string;
};
