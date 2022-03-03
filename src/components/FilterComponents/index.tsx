import { ChangeEvent, useRef } from "react";
import { textLists } from "src/types";

type Props = {
  textLists: textLists;
  prices: {
    id: number;
    price: string;
  }[];
  handlePriceFilter: (e: ChangeEvent<HTMLSelectElement>) => void;
  filterContents: () => void;
  handleReset: () => void;
};

export const FilterComponents: React.FC<Props> = (props) => {
  const ref = useRef(null);

  return (
    <div className="mx-auto my-5 py-6 w-11/12 font-mono bg-red-100 rounded-lg shadow-lg sm:mt-6 sm:py-5">
      <div className="mx-auto w-9/12 sm:w-10/12">
        <div className="flex items-end justify-evenly">
          <div>
            {props.textLists.map((list) => (
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
              onChange={(e) => props.handlePriceFilter(e)}
              ref={ref}
            >
              {props.prices.map((price) => (
                <option key={price.id} value={price.id}>
                  {price.price}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button
              className="ml-6 py-2 w-20 font-mono bg-yellow-200 rounded-lg sm:m-4"
              onClick={() => props.filterContents()}
            >
              絞り込む
            </button>

            <button
              className="ml-6 py-2 w-20 font-mono bg-red-300 rounded-lg sm:m-4"
              onClick={() => props.handleReset()}
            >
              リセット
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
