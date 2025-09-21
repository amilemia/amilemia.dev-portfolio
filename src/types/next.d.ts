import 'next';
import { NextRouter } from 'next/router';

// Extend the Next.js Page type
type NextPageProps = {
  params?: { [key: string]: string | string[] };
  searchParams?: { [key: string]: string | string[] | undefined };
};

declare module 'next' {
  export type PageProps = NextPageProps;
}

declare module 'next/app' {
  import { AppProps as NextAppProps } from 'next/app';
  
  export type AppProps<P = Record<string, unknown>> = NextAppProps<P> & {
    Component: NextAppProps['Component'] & {
      getLayout?: (page: React.ReactNode) => React.ReactNode;
    };
    router: NextRouter;
    __N_SSG?: boolean;
    __N_SSP?: boolean;
  };
}

// This tells TypeScript about the global type for page props
declare global {
  namespace React {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
      // Add any custom HTML attributes here if needed
    }
  }
}
