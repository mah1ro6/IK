import { ReactNode } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

type Props = {
  children: ReactNode;
};

export const ContainerLayout: React.FC<Props> = ({ children }) => {
  const router = useRouter();

  return (
    <div className="mx-auto bg-gray-100">
      {router.pathname !== "/" ? (
        <div className="">
          <Link href="/">
            <a className="font-mono block py-5 text-xl bg-gray-200 text-gray-700 shadow-md text-center">トップに戻る</a>
          </Link>
        </div>
      ) : null}
      {children}
    </div>
  );
};
