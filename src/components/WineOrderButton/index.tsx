import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { handleOnOrder } from "src/method";
import { Data } from "src/types";

type Props = {
  rankData: Data[];
  index: number;
  id: string;
};

export const WineOrderButton: React.FC<Props> = (props) => {
  const [counts, setCounts] = useState<number[]>([]);

  useEffect(() => {
    for (let i = 0; i < props.rankData.length; i++) {
      setCounts((count) => [...count, 0]);
    }
  }, [props.rankData.length]);

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
    <div className="flex justify-between mt-5">
      <div className="flex items-center">
        <p className="font-mono">発注本数: </p>
        <p className="ml-2 font-mono">{counts[props.index]}</p>
      </div>
      <div className="flex">
        <button
          className="mr-1 p-2 font-mono bg-gray-300 rounded-lg"
          onClick={() => addCount(props.index)}
        >
          +
        </button>
        <button
          className="ml-1 p-2 font-mono bg-gray-300 rounded-lg"
          onClick={() => reduceCount(props.index)}
        >
          -
        </button>
      </div>
      <button
        className="px-4 py-2 font-mono bg-yellow-300 rounded-lg"
        onClick={() => handleOnOrder(props.id, counts[props.index])}
      >
        発注
      </button>
      <Toaster />
    </div>
  );
};
