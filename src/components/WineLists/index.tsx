import { ReactNode } from "react";

type Data = {
  id: string;
  name: string;
  origin: string;
  variety: string;
  taste: string;
  rank: string;
  producer?: string;
  image?: {
    url: string;
  };
  remarks?: string;
};

type Props = {
  keyRank: string;
  data: any;
  // data: {
  //   contents: Data[];
  // };
  sampleImage: string;
};

export const WineLists: React.FC<Props> = (props) => {
  const rankData = props.data.contents?.filter(
    (data: Data) => data.rank[0] === props.keyRank
  );

  console.log(rankData);

  if (rankData.length === 0) {
    return <p className='text-4xl h-full text-gray-700 flex justify-center items-center font-mono'>登録しているワインがありません!</p>;
  }

  return (
    <div className="h-screen">
      {rankData?.map((data: Data) => (
        <div
          className="h-1/3 flex justify-around items-center bg-blue-100 mb-6"
          key={data.id}
        >
          <div>
            <img
              className="w-60 h-60 object-cover rounded-lg"
              src={data?.image ? data.image.url : props.sampleImage}
              alt="ワインの画像です"
            />
          </div>
          <dl className="flex flex-wrap tracking-wide w-1/2 font-mono bg-yellow-50 rounded-lg p-7 text-gray-700">
            <dt className="leading-relaxed flex w-3/12 font-bold">
              ワイン名 :{" "}
            </dt>
            <dd className="leading-relaxed w-9/12">{data.name}</dd>
            <dt className="leading-relaxed flex w-3/12 font-bold">品種 : </dt>
            <dd className="leading-relaxed w-9/12">{data.variety}</dd>
            <dt className="leading-relaxed flex w-3/12 font-bold">産地 : </dt>
            <dd className="leading-relaxed w-9/12">{data.origin}</dd>
            <dt className="leading-relaxed flex w-3/12 font-bold">味わい : </dt>
            <dd className="leading-relaxed w-9/12">{data.taste}</dd>
            {data.producer ? (
              <>
                <dt className="flex w-3/12 font-bold">生産者 : </dt>
                <dd className="w-9/12">{data.producer}</dd>
              </>
            ) : null}
            {data.remarks ? (
              <>
                <dt className="flex w-3/12 font-bold">備考 : </dt>
                <dd className="w-9/12">{data.remarks}</dd>
              </>
            ) : null}
          </dl>
        </div>
      ))}
    </div>
  );
};
