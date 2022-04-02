import type { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';
import { ContainerLayout } from '../layouts/containerLayout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContainerLayout>
      <Component {...pageProps} />
    </ContainerLayout>
  );
}

export default MyApp;
