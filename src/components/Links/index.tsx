import Link from 'next/link';

type Props = {
  height: string;
  propsData: any;
};

export const Links: React.FC<Props> = (props: Props) => {
  return (
    <div className="mx-auto w-5/6">
      <div className="h-screen text-center flex flex-col justify-around items-center">
        {props.propsData.map((data: any) => (
          <Link href={`/${data.url}`} key={data.url}>
            <a
              className={`${props.height} w-2/3 flex justify-center items-center bg-blue-300 rounded-2xl font-mono text-4xl text-white tracking-wider shadow-md`}
            >
              {data.text}
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};
