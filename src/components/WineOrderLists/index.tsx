import { handleOffOrder } from "src/method";
import { Data, Props } from "src/types";
import { Toaster } from "react-hot-toast";
import { ItemLists } from "../ItemLists";

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
    <div className="h-screen">
      {data?.map((data: Data) => (
        <div
          className="flex items-center justify-around mt-6 mx-auto w-11/12 h-1/3 bg-blue-100 rounded-lg shadow-lg sm:flex-wrap sm:py-8 sm:h-auto"
          key={data.id}
        >
          <div className="text-center">
            <img
              className="w-60 h-60 rounded-lg object-cover sm:mx-auto"
              src={data?.image ? data.image.url : props.sampleImage}
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
        </div>
      ))}
    </div>
  );
};
