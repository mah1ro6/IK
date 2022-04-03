import { Data, Props } from "src/types";
import { handleDelete, handleOnOrder } from "src/method";
import { HandleCountButton } from "../../../../components/HandleCountButton";
import { ItemLists } from "../../../../components/ItemLists";
import { FilterComponents } from "../../../../components/FilterComponents";
import { useFilter } from "src/hooks/useFilter";
import React, { useMemo } from "react";
import { ContentLayout } from "src/layouts/contentLayout";
import Image from "next/image";

export const FrontWineLists: React.FC<Props> = (props) => {
  const contents = useMemo(() => props.contents, []);
  const { data, textLists, filterContents, handlePriceFilter, handleReset } =
    useFilter(contents);

  const rankData = useMemo(
    () =>
      data?.filter(
        (data: Data) =>
          data.rank[0] === props.keyRank && data.type[0] === props.keyType
      ),
    []
  );

  if (rankData.length === 0) {
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
        filterContents={filterContents}
        handlePriceFilter={handlePriceFilter}
        handleReset={handleReset}
      />
      {rankData?.map((data: Data, index) => (
        <React.Fragment key={data.id}>
          <ContentLayout>
            <div className="text-center">
              <div>
                <Image
                  src={
                    data?.image
                      ? data.image.url
                      : "/images/ikgroup-wineimage.jpg"
                  }
                  objectFit={"cover"}
                  width={240}
                  height={240}
                  alt="ワインの画像です"
                  className="rounded-lg"
                />
              </div>
              <div className="flex items-center justify-between mt-5 font-mono">
                <p>ワインを1本削除する</p>
                <button
                  className="py-2 w-1/3 font-mono bg-yellow-100 rounded-lg"
                  onClick={() => handleDelete(data.id, data.frontBottleCount)}
                >
                  削除
                </button>
              </div>
              <div className="flex mt-5 font-mono">
                <p>表にある本数:</p>
                <p className="ml-5">{data.frontBottleCount}</p>
              </div>
              <div className="flex mt-5 font-mono">
                <p>セラーにある本数:</p>
                <p className="ml-5">{data.cellarBottleCount}</p>
              </div>
              <HandleCountButton
                rankData={rankData}
                index={index}
                id={data.id}
                text="発注本数"
                handlePost={handleOnOrder}
              />
            </div>
            <ItemLists items={data} />
          </ContentLayout>
        </React.Fragment>
      ))}
    </div>
  );
};
