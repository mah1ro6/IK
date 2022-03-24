import { Action, State } from "src/types";

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "patchOff":
      return { ...state, onPatch: false };
    case "patchOn":
      return { ...state, onPatch: true };
    case "handleChange":
      const items = state.wineItems.map((item, i) =>
        i === action.index
          ? { title: item.title, titleData: action.value }
          : item
      );
      return { ...state, wineItems: items };
    default:
      return state;
  }
};