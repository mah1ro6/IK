import { useRouter } from "next/router";
import React, { useState } from "react";
import { handleSetItemText } from "src/method";
import { Data } from "src/types";

type Props = {
  items: Data;
};

export const ItemLists: React.FC<Props> = (props) => {
  const router = useRouter();
  const data = props.items;
  const [onPatch, setOnPatch] = useState(false);
  const [wineItems, setWineItems] = useState([
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
  ]);
  const [initWineItems, setInitWineItems] = useState(wineItems);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setWineItems((items) =>
      items.map((item, i) =>
        i === index ? { title: item.title, titleData: e.target.value } : item
      )
    );
  };

  const handleSetItem = (id: string) => {
    console.log(initWineItems);
    console.log(wineItems);

    const postData = wineItems.filter((item, index) => {
      return item.titleData !== initWineItems[index].titleData;
    });

    console.log(JSON.stringify(postData));

    setOnPatch(false);
    handleSetItemText(JSON.stringify(postData), id);
  };

  return (
    <dl className="sm: flex flex-wrap justify-around p-7 w-1/2 text-gray-700 font-mono tracking-wide bg-yellow-50 rounded-lg sm:mt-4 sm:w-11/12">
      {wineItems.map((item, index) =>
        item.titleData || item.titleData === "" ? (
          <React.Fragment key={item.title}>
            <dt className="mt-2 w-1/4 font-bold leading-loose">{item.title}</dt>
            {!onPatch ? (
              <dd className="mt-2 w-3/4 leading-loose sm:w-2/3">
                {item.titleData}
              </dd>
            ) : item.title !== "備考:" ? (
              <input
                className="mt-2 border rounded-md"
                value={item.titleData}
                onChange={(e) => handleChange(e, index)}
              />
            ) : (
              <textarea
                className="mt-2 border rounded-md"
                wrap="soft"
                value={item.titleData}
                onChange={(e) => handleChange(e, index)}
              />
            )}
          </React.Fragment>
        ) : null
      )}
      {router.pathname.indexOf("order") === -1 ? (
        <div className="mt-6 w-full">
          <div className="flex flex-auto items-center mt-7">
            <p className="w-1/2 text-gray-500">項目の編集</p>
            <button
              className="py-2 w-1/3 font-mono bg-blue-200 rounded-lg"
              onClick={() => setOnPatch(true)}
            >
              編集
            </button>
            <button
              className="ml-3 py-2 w-1/3 font-mono bg-yellow-300 rounded-lg"
              onClick={() => handleSetItem(data.id)}
            >
              完了
            </button>
          </div>
        </div>
      ) : null}
    </dl>
  );
};
