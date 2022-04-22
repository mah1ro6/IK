import { ComponentProps, useCallback } from "react";
import toast from "react-hot-toast";
import { Data } from "src/types";
import { prices } from "src/utils";

export const usePriceFilter = (
  contents: Data[],
  setData: React.Dispatch<React.SetStateAction<Data[]>>
) => {
  const handlePriceFilter: ComponentProps<"select">["onChange"] = useCallback(
    (e) => {
      const priceFilterContents = contents.filter(({ price }) => {
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
          `${
            prices[parseInt(e.target.value) - 1].price
          }円のワインはありません。`
        );
        e.target.value = "1";
        setData(contents);
      } else {
        setData(priceFilterContents);
      }
    },
    [contents, setData]
  );

  return {
    handlePriceFilter,
    prices,
  };
};
