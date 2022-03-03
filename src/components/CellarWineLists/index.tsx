import { cellarToFront } from "src/method";
import { Data, Props } from "src/types";
import toast from "react-hot-toast";
import { useRef, useState } from "react";
import { WineOrderButton } from "../WineOrderButton";

export const CellarWineLists: React.FC<Props> = (props) => {
  const [originFilterQuery, setOriginFilterQuery] = useState("");
  const [varietyFilterQuery, setVarietyFilterQuery] = useState("");
  const [tasteFilterQuery, setTasteFilterQuery] = useState("");
  const [data, setData] = useState(props.contents);
  const ref = useRef(null);

  if (data.length === 0) {
    return (
      <p className="flex items-center justify-center h-screen text-gray-700 font-mono text-4xl sm:text-2xl">
        登録しているワインがありません!
      </p>
    );
  }
  const filterContents = () => {
    if (
      !originFilterQuery.match("[^\x01-\x7E]") &&
      !varietyFilterQuery.match("[^\x01-\x7E]") &&
      !tasteFilterQuery.match("[^\x01-\x7E]")
    ) {
      toast.error("ひらがな、または漢字で検索欄に入力してください。");
    } else if (
      originFilterQuery === "" &&
      varietyFilterQuery === "" &&
      tasteFilterQuery === ""
    ) {
      toast.error("検索欄が空欄です。");
    } else {
      const originFilterData = data.filter((data) => {
        return data.origin === originFilterQuery;
      });

      const isOriginData =
        originFilterData.length === 0 ? data : originFilterData;

      const varietyFilterData = isOriginData.filter((data) => {
        return data.variety === varietyFilterQuery;
      });

      const isVarietyData =
        varietyFilterData.length === 0 ? isOriginData : varietyFilterData;

      const tasteFilterData = isVarietyData.filter((data) => {
        return data.taste
          .replace("、", "")
          .includes(tasteFilterQuery.replace("、", ""));
      });

      const filterData =
        tasteFilterData.length === 0 ? isVarietyData : tasteFilterData;

      {
        filterData.length === 0
          ? toast.error("検索に一致するワインが見つかりませんでした。")
          : setData(filterData);
      }
    }
  };

  const handlePriceFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const priceFilterContents = props.contents.filter(({ price }) => {
      for (let i: number = prices.length; i > 0; i--) {
        if (
          i === prices.length &&
          e.target.value === prices.length.toString() &&
          price >= (i + 1) * 1000
        ) {
          return true;
        }
        if (
          i > 1 &&
          i < prices.length &&
          e.target.value === i.toString() &&
          (i + 1) * 1000 + 999 >= price &&
          price >= (i + 1) * 1000
        ) {
          return true;
        }
        if (i === 1 && e.target.value === i.toString()) {
          return true;
        }
      }
    });

    if (priceFilterContents.length === 0) {
      toast.error(
        `${prices[parseInt(e.target.value) - 1].price}円のワインはありません。`
      );
      e.target.value = "1";
      setData(props.contents);
    } else {
      setData(priceFilterContents);
    }
  };

  const prices = [
    { id: 1, price: "〜なし〜" },
    { id: 2, price: "3000~3999" },
    { id: 3, price: "4000~4999" },
    { id: 4, price: "5000~5999" },
    { id: 5, price: "6000~6999" },
    { id: 6, price: "7000~" },
  ];

  const textLists = [
    {
      title: "産地: ",
      placeholder: "例）ブルゴーニュ",
      value: originFilterQuery,
      onChange: setOriginFilterQuery,
    },
    {
      title: "品種: ",
      placeholder: "例）シャルドネ",
      value: varietyFilterQuery,
      onChange: setVarietyFilterQuery,
    },
    {
      title: "味わい: ",
      placeholder: "例）フルーティ",
      value: tasteFilterQuery,
      onChange: setTasteFilterQuery,
    },
  ];

  const handleReset = () => {
    setData(props.contents);
    setOriginFilterQuery("");
    setVarietyFilterQuery("");
    setTasteFilterQuery("");
  };

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
