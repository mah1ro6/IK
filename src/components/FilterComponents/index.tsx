import { ChangeEvent, useRef } from "react";
import { Toaster } from "react-hot-toast";
import { TextLists } from "src/types";

type Props = {
  textLists: TextLists;
  prices?: {
    id: number;
    price: string;
  }[];
  handlePriceFilter?: (e: ChangeEvent<HTMLSelectElement>) => void;
  filterContents: () => void;
  handleReset: () => void;
};

export const FilterComponents: React.FC<Props> = (props) => {
  const ref = useRef(null);

  return (
    <div className="mb-6 mx-auto py-6 w-11/12 font-mono bg-red-100 rounded-lg shadow-lg">
      <div className="mx-auto w-9/12 sm:w-10/12">
        <div className="flex items-end justify-between sm:flex-col sm:items-center">
          <div className="sm:w-10/12">
            {props.textLists.map((list) => (
              <div key={list.title} className="my-2 sm:flex sm:justify-between">
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
          </div>
          <div>
            <button
              className="ml-6 py-2 w-20 font-mono bg-blue-200 rounded-lg sm:m-4"
              onClick={() => props.filterContents()}
            >
              絞り込む
            </button>
            <Toaster />
            <button
              type="reset"
              className="ml-6 px-3 py-2 font-mono bg-yellow-300 rounded-lg sm:m-4"
              onClick={() => props.handleReset()}
            >
              項目のリセット
            </button>
          </div>
        </div>
        {typeof props.handlePriceFilter !== "undefined" ? (
          <div className="mt-5 pt-5 border-t-2 border-gray-600 sm:mx-auto sm:w-10/12">
            <form className="flex justify-between sm:flex-col">
              <div className="flex items-center sm:justify-between">
                <p className="mr-6">値段帯:</p>
                <select
                  id="price"
                  className="rounded-lg"
                  onChange={(e) =>
                    typeof props.handlePriceFilter !== "undefined"
                      ? props.handlePriceFilter(e)
                      : null
                  }
                  ref={ref}
                >
                  {props.prices?.map((price) => (
                    <option key={price.id} value={price.id}>
                      {price.price}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="reset"
                className="ml-6 px-5 py-2 font-mono bg-yellow-300 rounded-lg sm:m-4 sm:mx-auto sm:w-3/5"
                onClick={() => props.handleReset()}
              >
                値段帯のリセット
              </button>
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
};
