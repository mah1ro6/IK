import { addToFront, handleAddToCellar, handleOnOrder } from "src/method";
import { Data, Props } from "src/types";
import { HandleCountButton } from "../HandleCountButton";
import { useFilter } from "src/hooks/useFilter";
import { ItemLists } from "../ItemLists";
import { FilterComponents } from "../FilterComponents";

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
    <div className="h-screen sm:h-full">
      <FilterComponents
        textLists={textLists}
        prices={prices}
        handlePriceFilter={handlePriceFilter}
        filterContents={filterContents}
        handleReset={handleReset}
      />
      {data?.map((content: Data, index) => (
        <div
          className="flex items-center justify-around mx-auto my-5 w-11/12 h-2/5 bg-blue-100 rounded-lg shadow-lg sm:flex-wrap sm:py-8 sm:h-auto"
          key={content.id}
        >
          <div className="text-center">
            <img
              className="w-60 h-60 rounded-lg object-cover sm:mx-auto"
              src={content?.image ? content.image.url : props.sampleImage}
              alt="ワインの画像です"
            />
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
        </div>
      ))}
    </div>
  );
};
