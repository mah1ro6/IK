import axios from "axios";
import { Data, Props } from "src/types";
import toast, { Toaster } from "react-hot-toast";

export const WineLists: React.FC<Props> = (props) => {
  const contents = props.contents;

  const rankData = contents?.filter(
    (data: Data) =>
      data.rank[0] === props.keyRank && data.type[0] === props.keyType
  );

  if (rankData.length === 0) {
    return (
      <p className="flex items-center justify-center h-screen text-gray-700 font-mono text-4xl">
        登録しているワインがありません!
      </p>
    );
  }

  const deletePost = async (deleteId: string) => {
    await axios.post(
      "/api",
      { id: deleteId },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  };

  const handleDelete = async (deleteId: string): Promise<void> => {
    try {
      toast.promise(deletePost(deleteId), {
        loading: "削除中...",
        success: "削除に成功しました!",
        error: "削除に失敗しました...",
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="h-screen">
      {rankData?.map((data: Data) => (
        <div
          className="flex items-center justify-around mt-6 h-1/3 bg-blue-100"
          key={data.id}
        >
          <div className="text-center">
            <img
              className="w-60 h-60 rounded-lg object-cover"
              src={data?.image ? data.image.url : props.sampleImage}
              alt="ワインの画像です"
            />
            <button
              className="mt-5 w-1/3 font-mono bg-yellow-100 rounded-lg"
              onClick={() => handleDelete(data.id)}
            >
              削除
            </button>
            <Toaster />
          </div>
          <dl className="flex flex-wrap p-7 w-1/2 text-gray-700 font-mono tracking-wide bg-yellow-50 rounded-lg">
            <dt className="flex w-3/12 font-bold leading-relaxed">
              ワイン名 :{" "}
            </dt>
            <dd className="w-9/12 leading-relaxed">{data.name}</dd>
            <dt className="flex w-3/12 font-bold leading-relaxed">品種 : </dt>
            <dd className="w-9/12 leading-relaxed">{data.variety}</dd>
            <dt className="flex w-3/12 font-bold leading-relaxed">産地 : </dt>
            <dd className="w-9/12 leading-relaxed">{data.origin}</dd>
            <dt className="flex w-3/12 font-bold leading-relaxed">味わい : </dt>
            <dd className="w-9/12 leading-relaxed">{data.taste}</dd>
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
