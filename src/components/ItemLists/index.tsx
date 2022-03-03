import { useRouter } from "next/router";
import { Data } from "src/types";

type Props = {
  items: Data;
};

export const ItemLists: React.FC<Props> = (props) => {
  const router = useRouter();

  const data = props.items;

  const lists = [
    {
      title: "ワイン名:",
      titleData: data.name,
    },
    {
      title: "種類:",
      titleData: router.pathname.indexOf("cellar") !== -1 ? data.type : null,
    },
    {
      title: "ランク:",
      titleData: router.pathname.indexOf("cellar") !== -1 ? data.rank : null,
    },
    {
      title: "産地:",
      titleData: data.origin,
    },
    {
      title: "品種:",
      titleData: data.variety,
    },
    {
      title: "味わい:",
      titleData: data.taste,
    },
    {
      title: "値段:",
      titleData: data.price,
    },
    {
      title: "生産者:",
      titleData: data.producer,
    },
    {
      title: "備考:",
      titleData: data.remarks,
    },
  ];

  return (
    <dl className="sm: flex flex-wrap justify-around p-7 w-1/2 text-gray-700 font-mono tracking-wide bg-yellow-50 rounded-lg sm:mt-4 sm:w-11/12">
      {lists.map((item) =>
        item.titleData ? (
          <>
            <dt
              key={item.title}
              className="flex w-3/12 font-bold leading-relaxed"
            >
              {item.title}
            </dt>
            <dd className="w-9/12 leading-relaxed sm:w-2/3">
              {item.titleData}
            </dd>
          </>
        ) : null
      )}
    </dl>
  );
};
