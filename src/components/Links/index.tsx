import Link from "next/link";
import { PropsData } from "src/types";

type Props = {
  height: string;
  propsData: PropsData[];
};

export const Links: React.FC<Props> = (props) => {
  return (
    <div
      className={
        props.propsData.length === 4
          ? "h-screen text-center flex flex-wrap justify-around items-center w-11/12 mx-auto"
          : "h-screen text-center flex flex-col justify-around items-center"
      }
    >
      {props.propsData.map((data: PropsData) => (
        <Link
          href={
            typeof data.type === "undefined"
              ? `/${data.frontBack}`
              : typeof data.rank === "undefined"
              ? `/${data.frontBack}/${data?.type}`
              : `/${data.frontBack}/${data?.type}/${data?.rank}`
          }
          key={
            typeof data.type === "undefined"
              ? `/${data.frontBack}`
              : typeof data.rank === "undefined"
              ? `/${data.frontBack}/${data?.type}`
              : `/${data.frontBack}/${data?.type}/${data?.rank}`
          }
        >
          <a
            className={
              props.propsData.length === 4
                ? `${props.height} w-2/5 m-4 flex justify-center items-center bg-blue-300 rounded-2xl font-mono text-4xl text-white tracking-wider shadow-md sm:text-2xl sm:w-full sm:h-1/5`
                : `${props.height} w-2/3 flex justify-center items-center bg-blue-300 rounded-2xl font-mono text-4xl text-white tracking-wider shadow-md sm:text-2xl`
            }
          >
            {data.text}
          </a>
        </Link>
      ))}
    </div>
  );
};
