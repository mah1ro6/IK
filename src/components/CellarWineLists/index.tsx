import { cellarToFront } from "src/method";
import { Data, Props } from "src/types";
import { useRef } from "react";
import { WineOrderButton } from "../WineOrderButton";
import { useFilter } from "src/hooks/useFilter";

export const CellarWineLists: React.FC<Props> = (props) => {
  const {
    data,
    prices,
    textLists,
    handlePriceFilter,
    filterContents,
    handleReset,
  } = useFilter(props.contents);
  const ref = useRef(null);

  if (data.length === 0) {
    return (
      <p className="flex items-center justify-center h-screen text-gray-700 font-mono text-4xl sm:text-2xl">
        登録しているワインがありません!
      </p>
    );
  }

  return (
    <div className="h-screen sm:h-full">
      <div className="py-3 font-mono bg-red-100 sm:mt-6 sm:mx-auto sm:py-5 sm:w-11/12 sm:rounded-lg">
        <div className="mx-auto w-9/12 sm:w-10/12">
          <div className="flex items-end justify-evenly">
            <div>
              {textLists.map((list) => (
                <div key={list.title} className="my-2">
                  <p>{list.title}</p>
                  <input
                    type="text"
                    className="border rounded-lg"
                    placeholder={list.placeholder}
                    pattern="[^\x20-\x7E]*"
                    value={list.value}
                    onChange={(e) => list.onChange(e.target.value)}
                  />
                </div>
              ))}
              <p className="mr-6">値段帯:</p>
              <select
                id="price"
                className="rounded-lg"
                onChange={(e) => handlePriceFilter(e)}
                ref={ref}
              >
                {prices.map((price) => (
                  <option key={price.id} value={price.id}>
                    {price.price}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button
                className="ml-6 py-2 w-20 font-mono bg-yellow-200 rounded-lg sm:m-4"
                onClick={() => filterContents()}
              >
                絞り込む
              </button>

              <button
                className="ml-6 py-2 w-20 font-mono bg-red-300 rounded-lg sm:m-4"
                onClick={() => handleReset()}
              >
                リセット
              </button>
            </div>
          </div>
        </div>
      </div>
      {data?.map((content: Data, index) => (
        <div
          className="flex items-center justify-around mt-6 h-2/5 bg-blue-100 sm:flex-wrap sm:mx-auto sm:py-8 sm:w-11/12 sm:h-auto sm:rounded-lg"
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
              onClick={() => cellarToFront(content.id, content.bottleCount)}
            >
              表に出す
            </button>
            <div className="flex my-2 font-mono">
              <p>在庫: </p>
              <p className="ml-2">{content.bottleCount}</p>
            </div>
            <WineOrderButton rankData={data} index={index} id={content.id} />
          </div>
          <dl className="sm: flex flex-wrap justify-around p-7 w-1/2 text-gray-700 font-mono tracking-wide bg-yellow-50 rounded-lg sm:mt-4 sm:w-11/12">
            <dt className="flex w-3/12 font-bold leading-relaxed">
              ワイン名:{" "}
            </dt>
            <dd className="w-9/12 leading-relaxed sm:w-2/3">{content.name}</dd>
            <dt className="flex w-3/12 font-bold leading-relaxed">種類: </dt>
            <dd className="w-9/12 leading-relaxed sm:w-2/3">{content.type}</dd>
            <dt className="flex w-3/12 font-bold leading-relaxed">ランク: </dt>
            <dd className="w-9/12 leading-relaxed sm:w-2/3">{content.rank}</dd>
            <dt className="flex w-3/12 font-bold leading-relaxed">産地: </dt>
            <dd className="w-9/12 leading-relaxed sm:w-2/3">
              {content.origin}
            </dd>
            <dt className="flex w-3/12 font-bold leading-relaxed">品種: </dt>
            <dd className="w-9/12 leading-relaxed sm:w-2/3">
              {content.variety}
            </dd>
            <dt className="flex w-3/12 font-bold leading-relaxed">味わい: </dt>
            <dd className="w-9/12 leading-relaxed sm:w-2/3">{content.taste}</dd>
            {content.price ? (
              <>
                <dt className="flex w-3/12 font-bold leading-relaxed">
                  値段:{" "}
                </dt>
                <dd className="w-9/12 leading-relaxed sm:w-2/3">
                  {content.price}
                </dd>
              </>
            ) : null}
            {content.producer ? (
              <>
                <dt className="flex w-3/12 font-bold leading-relaxed">
                  生産者:{" "}
                </dt>
                <dd className="w-9/12 leading-relaxed sm:w-2/3">
                  {content.producer}
                </dd>
              </>
            ) : null}
            {content.remarks ? (
              <>
                <dt className="flex w-3/12 font-bold leading-relaxed">
                  備考:{" "}
                </dt>
                <dd className="w-9/12 leading-relaxed sm:w-2/3">
                  {content.remarks}
                </dd>
              </>
            ) : null}
          </dl>
        </div>
      ))}
    </div>
  );
};
