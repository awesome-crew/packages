import { type ReactNode } from 'react';
import { Helmet } from 'react-helmet';

interface ProviderProps {
  children: ReactNode;
}

export function Provider({ children }: ProviderProps) {
  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin=""
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-dynamic-subset.min.css"
        />
        <style>
          {`

         * {
            font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont,
system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR",
"Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
         }
            `}
        </style>
      </Helmet>
      {children}
    </>
  );
}
