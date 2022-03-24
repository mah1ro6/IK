import { NextRouter } from "next/router";
import { Data } from "src/types";

export const wineItemLists = (data: Data, router: NextRouter) => {
  
  return [
    {
      title: "ワイン名:",
      titleData: data.name,
    },
    {
      title: "種類:",
      titleData: router.pathname.indexOf("cellar") !== -1 ? data.type[0] : null,
    },
    {
      title: "ランク:",
      titleData: router.pathname.indexOf("cellar") !== -1 ? data.rank[0] : null,
    },
    {
      title: "産地:",
      titleData: data.origin,
    },
    {
      title: "品種:",
      titleData: data.variety,
    },
    {
      title: "味わい:",
      titleData: data.taste,
    },
    {
      title: "値段:",
      titleData: router.pathname.indexOf("front") !== -1 ? null : data.price,
    },
    {
      title: "生産者:",
      titleData: data.producer,
    },
    {
      title: "備考:",
      titleData: data.remarks,
    },
  ];
};

export const filterTypeLists = ["red", "white", "rose", "sparkling"];

export const filterRankLists = ["oneRank", "twoRank", "another"];

export const prices = [
  { id: 1, price: "〜なし〜" },
  { id: 2, price: "3000~3999" },
  { id: 3, price: "4000~4999" },
  { id: 4, price: "5000~5999" },
  { id: 5, price: "6000~6999" },
  { id: 6, price: "7000~" },
];
