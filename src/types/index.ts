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

export type Props = {
  keyRank?: string;
  keyType?: string;
  contents: Data[];
};

export type PagesProps = {
  data: {
    contents: Data[];
  };
  type: string;
  rank: string;
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

type HandleChangeAction = {
  type: "patchOff" | "patchOn" | "handleChange";
  index: number;
  value: string;
};

type NormalAction = {
  type: "patchOff" | "patchOn" | "handleChange";
  index?: undefined;
  value?: undefined;
};

export type Action = HandleChangeAction | NormalAction;