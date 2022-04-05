import Link from "next/link";
import { CustomLayout } from "next";

export const backToTopLayout: CustomLayout = (page) => {
  return (
    <div className="mx-auto bg-gray-100">
      <div>
        <Link href="/">
          <a className="block mb-6 py-5 text-center text-gray-700 font-mono text-xl bg-gray-200 shadow-md">
            トップに戻る
          </a>
        </Link>
      </div>
      {page}
    </div>
  );
};
