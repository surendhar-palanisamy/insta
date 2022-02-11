import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import useSWR, { SWRConfig } from 'swr'
import { SessionProvider } from 'next-auth/react'
import { ReactQueryDevtools } from 'react-query/devtools'
import Layout from '../components/layout/Layout';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {

  return <ChakraProvider>
    <RecoilRoot>
      <SessionProvider session={session}>
        <Layout childcomponent={<Component {...pageProps} />} />
      </SessionProvider>
    </RecoilRoot>
    {/* <ReactQueryDevtools initialIsOpen={false} position='bottom-right' /> */}


  </ChakraProvider>
}

export default MyApp
