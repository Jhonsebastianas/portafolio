import Head from "next/head";

/** New portafolio */
import "@styles/css/styles.css";
import "@styles/css/styles-resume.css";
import "@styles/css/swiper-bundle.min.css";
import "highlight.js/styles/github.css"; // Cambia 'github' por cualquier otro tema predeterminado

import { useRouter } from "next/router";
import { metaByRoute } from "src/util/metaConfig";

/**
 * Método que genera metricas importantes del proyecto
 * @param {*} metric
 */
export function reportWebVitals(metric) {
  console.log(metric);
}

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const path = router.pathname;

  const meta = metaByRoute[path] || defaultMeta;
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content={meta.description} />
        <meta name="author" content="Jhon Sebastian Agudelo Sierra" />
        <meta
          name="keywords"
          content="Jhon Sebastian,Agudelo Sierra,Desarrollador,fullstack,mentor"
        />
        <meta name="copyright" content="Jhon Sebastian Agudelo Sierra" />
        <title>{meta.title}</title>

        {/* Social media meta tags */}
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={meta.image} />
        <meta
          property="og:url"
          content={`https://www.jhonsebastianas.com${path}`}
        />
        <meta property="og:site_name" content="Jhon Agudelo, Portfolio." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image:alt" content="Preview website image" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
