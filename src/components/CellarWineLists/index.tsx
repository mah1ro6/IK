import { cellarToFront, handleOnOrder } from "src/method";
import { Data, Props } from "src/types";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

export const CellarWineLists: React.FC<Props> = (props) => {
  const [counts, setCounts] = useState<number[]>([]);
  const contents = props.contents;

  useEffect(() => {
    for (let i = 0; i < contents.length; i++) {
      setCounts((count) => [...count, 0]);
    }
  }, [contents.length]);

  if (contents.length === 0) {
    return (
      <p className="flex items-center justify-center h-screen text-gray-700 font-mono text-4xl sm:text-2xl">
        登録しているワインがありません!
      </p>
    );
  }

  const addCount = (index: number) => {
    setCounts(counts.map((count, i) => (i === index ? count + 1 : count)));
  };

  const reduceCount = (index: number) => {
    if (counts[index] > 0) {
      setCounts(counts.map((count, i) => (i === index ? count - 1 : count)));
    } else {
      return;
    }
  };

  return (
    <div className="h-screen sm:h-full">
      {contents?.map((data: Data, index) => (
        <div
          className="flex items-center justify-around mt-6 h-2/5 bg-blue-100 sm:flex-wrap sm:mx-auto sm:py-8 sm:w-11/12 sm:h-auto sm:rounded-lg"
          key={data.id}
        >
          <div className="text-center">
            <img
              className="w-60 h-60 rounded-lg object-cover sm:mx-auto"
              src={data?.image ? data.image.url : props.sampleImage}
              alt="ワインの画像です"
            />
            <button
              className="mt-5 mx-3 py-2 w-1/3 font-mono bg-yellow-100 rounded-lg"
              onClick={() => cellarToFront(data.id, data.bottleCount)}
            >
              表に出す
            </button>
            <div className="flex my-2 font-mono">
              <p>在庫: </p>
              <p className="ml-2 underline">
                {data.bottleCount}
              </p>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center font-mono">
                <p>発注本数: </p>
                <p className="ml-2 underline">{counts[index]}</p>
              </div>
              <div className="flex">
                <button
                  className="mr-1 p-2 font-mono bg-gray-300 rounded-lg"
                  onClick={() => addCount(index)}
                >
                  +
                </button>
                <button
                  className="ml-1 p-2 font-mono bg-gray-300 rounded-lg"
                  onClick={() => reduceCount(index)}
                >
                  -
                </button>
              </div>
              <button
                className="px-4 py-2 font-mono bg-yellow-300 rounded-lg"
                onClick={() => handleOnOrder(data.id, counts[index])}
              >
                発注
              </button>
              <Toaster />
            </div>
          </div>
          <dl className="sm: flex flex-wrap justify-around p-7 w-1/2 text-gray-700 font-mono tracking-wide bg-yellow-50 rounded-lg sm:mt-4 sm:w-11/12">
            <dt className="flex w-3/12 font-bold leading-relaxed">
              ワイン名:{" "}
            </dt>
            <dd className="w-9/12 leading-relaxed sm:w-2/3">{data.name}</dd>
            <dt className="flex w-3/12 font-bold leading-relaxed">種類: </dt>
            <dd className="w-9/12 leading-relaxed sm:w-2/3">{data.type}</dd>
            <dt className="flex w-3/12 font-bold leading-relaxed">ランク: </dt>
            <dd className="w-9/12 leading-relaxed sm:w-2/3">{data.rank}</dd>
            <dt className="flex w-3/12 font-bold leading-relaxed">品種: </dt>
            <dd className="w-9/12 leading-relaxed sm:w-2/3">{data.variety}</dd>
            <dt className="flex w-3/12 font-bold leading-relaxed">産地: </dt>
            <dd className="w-9/12 leading-relaxed sm:w-2/3">{data.origin}</dd>
            <dt className="flex w-3/12 font-bold leading-relaxed">味わい: </dt>
            <dd className="w-9/12 leading-relaxed sm:w-2/3">{data.taste}</dd>
            {data.price ? (
              <>
                <dt className="flex w-3/12 font-bold leading-relaxed">
                  値段:{" "}
                </dt>
                <dd className="w-9/12 leading-relaxed sm:w-2/3">
                  {data.price}
                </dd>
              </>
            ) : null}
            {data.producer ? (
              <>
                <dt className="flex w-3/12 font-bold leading-relaxed">
                  生産者:{" "}
                </dt>
                <dd className="w-9/12 leading-relaxed sm:w-2/3">
                  {data.producer}
                </dd>
              </>
            ) : null}
            {data.remarks ? (
              <>
                <dt className="flex w-3/12 font-bold leading-relaxed">
                  備考:{" "}
                </dt>
                <dd className="w-9/12 leading-relaxed sm:w-2/3">
                  {data.remarks}
                </dd>
              </>
            ) : null}
          </dl>
        </div>
      ))}
    </div>
  );
};
