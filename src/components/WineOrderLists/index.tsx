import { handleOffOrder } from "src/method";
import { Data, Props } from "src/types";
import { Toaster } from "react-hot-toast";
import { ItemLists } from "../ItemLists";
import { ContentLayout } from "src/layouts/contentLayout";
import React from "react";

export const WineOrderLists: React.FC<Props> = (props) => {
  const data = props.contents;

  if (data.length === 0) {
    return (
      <p className="flex items-center justify-center h-screen text-gray-700 font-mono text-4xl sm:text-2xl">
        登録しているワインがありません!
      </p>
    );
  }

  return (
    <div>
      {data?.map((data: Data) => (
        <React.Fragment key={data.id}>
          <ContentLayout>
            <div className="text-center">
              <img
                className="w-60 h-60 rounded-lg object-cover sm:mx-auto"
                src={
                  data?.image ? data.image.url : "/images/ikgroup-wineimage.jpg"
                }
                alt="ワインの画像です"
              />
              <div className="flex items-center justify-around mt-5">
                <div className="flex">
                  <p className="font-mono">発注本数:</p>
                  <p className="ml-5 font-mono">{data.orderBottleCount}</p>
                </div>
                <button
                  className="py-2 w-1/3 font-mono bg-yellow-100 rounded-lg"
                  onClick={() =>
                    handleOffOrder(
                      data.id,
                      data.cellarBottleCount,
                      data.frontBottleCount
                    )
                  }
                >
                  発注する
                </button>
                <Toaster />
              </div>
            </div>
            <ItemLists items={data} />
          </ContentLayout>
        </React.Fragment>
      ))}
    </div>
  );
};
