import { ReactElement, ReactNode } from 'react';

export const ContainerLayout = ({children}: any) => {
  return <div className='h-5/6 mx-auto'>{children}</div>;
};
