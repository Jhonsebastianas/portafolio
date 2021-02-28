import dynamic from "next/dynamic";
import Head from 'next/head'
import '@styles/globals.css'
import '@styles/styles.css'
import 'semantic-ui-css/semantic.min.css'
import { APP_NAME } from '@constants/Constants'

/**
 * Método que genera metricas importantes del proyecto
 * @param {*} metric 
 */
export function reportWebVitals (metric) {
  console.log(metric);
}

function MyApp({ Component, pageProps }) {
  return <>
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <meta
        name="description"
        content="Una forma moderna e interactiva de administrar tu consumo en servicios públicos del agua y energía."
      />
      <title>{APP_NAME}</title>
    </Head>
    <Component {...pageProps} />
  </>
}

export default MyApp