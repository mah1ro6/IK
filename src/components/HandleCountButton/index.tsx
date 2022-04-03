import { useCallback, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Data } from "src/types";

type Props = {
  rankData: Data[];
  content?: Data;
  index: number;
  id: string;
  text: string;
  handlePost: (id: string, count: number) => Promise<void>;
};

export const HandleCountButton: React.FC<Props> = (props) => {
  const [orderCounts, setOrderCounts] = useState<number[]>([]);
  const [stockBottleCounts, setStockBottleCounts] = useState<number[]>(
    props.rankData.map((data) => data.cellarBottleCount)
  );

  useEffect(() => {
    for (let i = 0; i < props.rankData.length; i++) {
      setOrderCounts((count) => [...count, 0]);
    }
  }, [props.rankData.length]);

  const addCount = useCallback(
    (index: number) => {
      setOrderCounts(
        orderCounts.map((count, i) => (i === index ? count + 1 : count))
      );
      setStockBottleCounts((counts) =>
        counts.map((count, i) => (i === index ? count + 1 : count))
      );
    },
    [orderCounts]
  );

  const reduceCount = useCallback(
    (index: number) => {
      if (orderCounts[index] > 0) {
        setOrderCounts(
          orderCounts.map((count, i) => (i === index ? count - 1 : count))
        );
      } else {
        return;
      }
    },
    [orderCounts]
  );

  return (
    <div className="flex justify-between mt-5">
      <div className="flex items-center">
        <p className="font-mono">{props.text}: </p>
        <p className="ml-2 font-mono">
          {props.text === "発注本数"
            ? orderCounts[props.index]
            : stockBottleCounts[props.index]}
        </p>
      </div>
      <div className="flex">
        <button
          className="mr-1 p-2 font-mono bg-gray-300 rounded-lg"
          onClick={() => addCount(props.index)}
        >
          +
        </button>
        {props.text === "発注本数" ? (
          <button
            className="ml-1 p-2 font-mono bg-gray-300 rounded-lg"
            onClick={() => reduceCount(props.index)}
          >
            -
          </button>
        ) : null}
      </div>
      <button
        className="px-4 py-2 font-mono bg-yellow-300 rounded-lg"
        onClick={() =>
          props.handlePost(
            props.id,
            props.text === "発注本数"
              ? orderCounts[props.index]
              : stockBottleCounts[props.index]
          )
        }
      >
        {props.text === "発注本数" ? "発注" : "送信"}
      </button>
      <Toaster />
    </div>
  );
};
