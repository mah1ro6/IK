import { handleOffOrder } from "src/method";
import { Data, Props } from "src/types";
import { Toaster } from "react-hot-toast";

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
          className="flex items-center justify-around mt-6 h-1/3 bg-blue-100 sm:flex-wrap sm:mx-auto sm:py-8 sm:w-11/12 sm:h-auto sm:rounded-lg"
          key={data.id}
        >
          <div className="text-center">
            <img
              className="w-60 h-60 rounded-lg object-cover sm:mx-auto"
              src={data?.image ? data.image.url : props.sampleImage}
              alt="ワインの画像です"
            />
            <button
              className="mt-5 py-2 w-1/3 font-mono bg-yellow-100 rounded-lg"
              onClick={() => handleOffOrder(data.id)}
            >
              発注済
            </button>
            <Toaster />
          </div>
          <dl className="sm: flex flex-wrap justify-around p-7 w-1/2 text-gray-700 font-mono tracking-wide bg-yellow-50 rounded-lg sm:mt-4 sm:w-11/12">
            <dt className="flex w-3/12 font-bold leading-relaxed">
              ワイン名:{" "}
            </dt>
            <dd className="w-9/12 leading-relaxed sm:w-2/3">{data.name}</dd>
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
