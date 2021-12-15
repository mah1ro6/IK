import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const ContainerLayout: React.FC<Props> = ({ children }) => {
  return <div className="mx-auto h-5/6 bg-gray-100">{children}</div>;
};
