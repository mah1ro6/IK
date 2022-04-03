import { addToFront, handleAddToCellar, handleOnOrder } from "src/method";
import { Data, Props } from "src/types";
import { HandleCountButton } from "../../components/HandleCountButton";
import { useFilter } from "src/hooks/useFilter";
import { ItemLists } from "../../components/ItemLists";
import { FilterComponents } from "../../components/FilterComponents";
import React from "react";
import { ContentLayout } from "src/layouts/contentLayout";
import Image from "next/image";

export const CellarWineLists: React.FC<Props> = (props) => {
  const {
    data,
    prices,
    textLists,
    handlePriceFilter,
    filterContents,
    handleReset,
  } = useFilter(props.contents);

  if (data.length === 0) {
    return (
      <p className="flex items-center justify-center h-screen text-gray-700 font-mono text-4xl sm:text-2xl">
        登録しているワインがありません!
      </p>
    );
  }

  return (
    <div>
      <FilterComponents
        textLists={textLists}
        prices={prices}
        handlePriceFilter={handlePriceFilter}
        filterContents={filterContents}
        handleReset={handleReset}
      />
      {data?.map((content: Data, index) => (
        <React.Fragment key={content.id}>
          <ContentLayout>
            <div className="text-center">
              <div>
                <Image
                  src={
                    content?.image
                      ? content.image.url
                      : "/images/ikgroup-wineimage.jpg"
                  }
                  objectFit={"cover"}
                  width={240}
                  height={240}
                  alt="ワインの画像です"
                  className="rounded-lg"
                />
              </div>
              <button
                className="mt-5 mx-3 py-2 w-1/3 font-mono bg-yellow-100 rounded-lg"
                onClick={() =>
                  addToFront(
                    content.id,
                    content.cellarBottleCount,
                    content.frontBottleCount
                  )
                }
              >
                表に出す
              </button>
              <HandleCountButton
                rankData={data}
                content={content}
                index={index}
                id={content.id}
                text="在庫"
                handlePost={handleAddToCellar}
              />
              <HandleCountButton
                rankData={data}
                index={index}
                id={content.id}
                text="発注本数"
                handlePost={handleOnOrder}
              />
            </div>
            <ItemLists items={content} />
          </ContentLayout>
        </React.Fragment>
      ))}
    </div>
  );
};
