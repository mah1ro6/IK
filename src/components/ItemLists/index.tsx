import { useRouter } from "next/router";
import React, { useCallback, useMemo, useReducer } from "react";
import toast from "react-hot-toast";
import { handleSetItemText } from "src/method";
import { Data } from "src/types";
import { filterRankLists, filterTypeLists, wineItemLists } from "src/utils";
import { reducer } from "src/hooks/reducer";

type Props = {
  items: Data;
};

export const ItemLists: React.FC<Props> = (props) => {
  const router = useRouter();
  const data = useMemo(() => props.items, [props.items]);

  const initState = useMemo(() => {
    return { onPatch: false, wineItems: wineItemLists(data, router) };
  }, [data, router]);

  const [state, dispatch] = useReducer(reducer, initState);

  const handleChange = useCallback(
    (
      e:
        | React.ChangeEvent<HTMLTextAreaElement>
        | React.ChangeEvent<HTMLInputElement>,
      index: number
    ) => {
      dispatch({ type: "handleChange", index, value: e.target.value });
    },
    []
  );

  const handleSetItem = useCallback(
    (id: string) => {
      const initPostData = state.wineItems.filter((item, index) => {
        return item.titleData !== initState.wineItems[index].titleData;
      });

      const filterPostData = initPostData.filter(
        ({ title }) => title === "種類:" || title === "ランク:"
      );

      const filterTypeAndRank = filterPostData.some((data) =>
        data.title === "種類:"
          ? filterTypeLists.some((type) => type === data.titleData)
          : data.title === "ランク:"
          ? filterRankLists.some((rank) => rank === data.titleData)
          : null
      );

      if (initPostData.length === 0) {
        dispatch({ type: "patchOff" });
      } else if (!filterTypeAndRank && filterPostData.length !== 0) {
        filterPostData.map((data) => {
          if (data.title === "種類:") {
            toast.error(
              'ワインの種類は\n"red","white","rose","spark"\nのどれかを入力してください'
            );
          } else if (data.title === "ランク:") {
            toast.error(
              'ワインのランクは\n"oneRank","twoRank","another"\nのどれかを入力してください'
            );
          }
        });
      } else {
        handleSetItemText(JSON.stringify(initPostData), id);
      }
    },
    [state.wineItems, initState.wineItems]
  );

  return (
    <dl className="sm: flex flex-wrap justify-around p-7 w-1/2 text-gray-700 font-mono tracking-wide bg-yellow-50 rounded-lg sm:mt-4 sm:w-11/12">
      {state.wineItems.map((item, index) =>
        item.titleData || item.titleData === "" ? (
          <React.Fragment key={item.title}>
            <dt className="mt-2 w-1/4 font-bold leading-loose">{item.title}</dt>
            {!state.onPatch ? (
              <dd className="mt-2 w-3/4 leading-loose sm:w-2/3">
                {item.titleData}
              </dd>
            ) : item.title !== "備考:" ? (
              <input
                className="mt-2 border rounded-md"
                value={item.titleData}
                onChange={(e) => handleChange(e, index)}
              />
            ) : (
              <textarea
                className="mt-2 border rounded-md"
                wrap="soft"
                value={item.titleData}
                onChange={(e) => handleChange(e, index)}
              />
            )}
          </React.Fragment>
        ) : null
      )}
      {router.pathname.indexOf("order") === -1 ? (
        <div className="mt-6 w-full">
          <div className="flex flex-auto items-center mt-7">
            <p className="w-1/2 text-gray-500">項目の編集</p>
            <button
              className="py-2 w-1/3 font-mono bg-blue-200 rounded-lg"
              onClick={() => dispatch({ type: "patchOn" })}
            >
              編集
            </button>
            <button
              className="ml-3 py-2 w-1/3 font-mono bg-yellow-300 rounded-lg"
              onClick={() => handleSetItem(data.id)}
            >
              完了
            </button>
          </div>
        </div>
      ) : null}
    </dl>
  );
};
