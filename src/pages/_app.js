import dynamic from "next/dynamic";
import Head from 'next/head'
// import '@styles/globals.css'
// import '@styles/styles.css'
// import '@styles/css/Hero.css'
// import '@styles/css/ColoresGlobales.css'
// import 'semantic-ui-css/semantic.min.css'

/** New portafolio */
import '@styles/css/styles.css'
import '@styles/css/swiper-bundle.min.css'


import { APP_NAME } from '@constants/Constants'

/**
 * Método que genera metricas importantes del proyecto
 * @param {*} metric 
 */
export function reportWebVitals(metric) {
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
        content="Software development and mentor, Jhon Agudelo"
      />
      <meta name="keywords" content="Jhon Sebastian,
        Agudelo Sierra, Jhon Agudelo, Desarrollador, 
        Desarrollador web, fullstack, Desarrollador de software, Desarrollador backend, Desarrollador frontend, mentor"/>
      <meta name="author" content="Jhon Sebastian Agudelo Sierra" />
      <meta name="copyright" content="Jhon Sebastian Agudelo Sierra" />
      <title>{APP_NAME}</title>

      {/* Meta tags for social media */}
      <meta property="og:title" content="Jhon Agudelo: Software development and mentor." />
      <meta property="og:description" content="Backend and frontend software developer, and development knowledge in IoT, producing quality work." />
      <meta property="og:image" content="https://www.jhonsebastianas.com/images/portfolio_presentation.png" />
      <meta property="og:url" content="https://www.jhonsebastianas.com/" />
      <meta name="twitter:card" content="summary_large_image"></meta>
    </Head>
    <Component {...pageProps} />
  </>
}

export default MyApp