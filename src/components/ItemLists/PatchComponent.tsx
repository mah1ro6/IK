import { Action } from "src/types";

type Props = {
  handleSetItem: (id: string) => void;
  id: string;
  dispatch: (value: Action) => void;
};

export const PatchComponent: React.FC<Props> = (props) => {
  return (
    <div className="mt-6 w-full">
      <div className="flex flex-auto items-center mt-7">
        <p className="w-1/2 text-gray-500">項目の編集</p>
        <button
          className="py-2 w-1/3 font-mono bg-blue-200 rounded-lg"
          onClick={() => props.dispatch({ type: "patchOn" })}
        >
          編集
        </button>
        <button
          className="ml-3 py-2 w-1/3 font-mono bg-yellow-300 rounded-lg"
          onClick={() => props.handleSetItem(props.id)}
        >
          完了
        </button>
      </div>
    </div>
  );
};
