import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Data } from "src/types";

export const useItemFilter = (contents: Data[]) => {
  const [originFilterQuery, setOriginFilterQuery] = useState("");
  const [varietyFilterQuery, setVarietyFilterQuery] = useState("");
  const [tasteFilterQuery, setTasteFilterQuery] = useState("");
  const [data, setData] = useState(contents);
  
  const textLists = useMemo(
    () => [
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
    ],
    [originFilterQuery, varietyFilterQuery, tasteFilterQuery]
  );

  const filterContents = useCallback(() => {
    if (
      !originFilterQuery.match("[^\x01-\x7E]") &&
      !varietyFilterQuery.match("[^\x01-\x7E]") &&
      !tasteFilterQuery.match("[^\x01-\x7E]")
    ) {
      toast.error("ひらがな、または漢字で検索欄に入力してください。");
    }
    if (originFilterQuery !== "") {
      setData((filterData) =>
        filterData.filter((data) => {
          return data.origin.includes(originFilterQuery);
        })
      );
    }

    if (varietyFilterQuery !== "") {
      setData((filterData) =>
        filterData.filter((data) => {
          return data.variety
            .replace("・" || "•", "")
            .includes(varietyFilterQuery.replace("・" || "•", ""));
        })
      );
    }

    if (tasteFilterQuery !== "") {
      setData((filterData) =>
        filterData.filter((data) => {
          return data.taste
            .replace("、" && "。", "")
            .includes(tasteFilterQuery.replace("、", ""));
        })
      );
    }
  }, [originFilterQuery, varietyFilterQuery, tasteFilterQuery, data]);

  useEffect(() => {
    if (data.length === 0) {
      toast.error("検索に一致するワインが見つかりませんでした。");
      handleReset();
    }
  }, [data.length]);

  const handleReset = useCallback(() => {
    setData(contents);
    setOriginFilterQuery("");
    setVarietyFilterQuery("");
    setTasteFilterQuery("");
  }, []);

  return {
    data,
    textLists,
    setData,
    filterContents,
    handleReset,
  };
};
