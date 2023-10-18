import dynamic from "next/dynamic";
import Head from 'next/head'

/** New portafolio */
import '@styles/css/styles.css'
import '@styles/css/styles-resume.css'
import '@styles/css/swiper-bundle.min.css'


import { APP_NAME } from '@constants/Constants'
import { useRouter } from "next/router";
import { useEffect } from "react";

/**
 * Método que genera metricas importantes del proyecto
 * @param {*} metric 
 */
export function reportWebVitals(metric) {
  console.log(metric);
}

const setMetaTagsBasedOnSubdomain = (subdomain) => {
  console.log({ subdomain })
  switch (subdomain) {
    case 'jhonsebastianas':
      return {
        title: 'Título para Subdominio 1',
        description: 'Descripción para Subdominio 1',
      };
    case '/grupo-universitario-san-juan-pablo-ii':
      return {
        title: 'Grupo universitario San Juan Pablo II',
        description: 'Únete a nuestro grupo universitario de la parroquia y descubre cómo la educación y la fe pueden trabajar juntas para fortalecer tu camino. Aquí, encontrarás apoyo espiritual, amistad y un propósito que trasciende lo académico.',
      };
    case '/grupo-universitario-san-juan-pablo-ii/acerca-de':
      return {
        title: 'Grupo universitario San Juan Pablo II',
        description: 'Únete a nuestro grupo universitario de la parroquia y descubre cómo la educación y la fe pueden trabajar juntas para fortalecer tu camino. Aquí, encontrarás apoyo espiritual, amistad y un propósito que trasciende lo académico.',
      };
    default:
      return {
        title: APP_NAME,
        description: 'Backend and frontend software developer, with development knowledge in IoT, producing quality work.',
      };
  }
};

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Obtener el subdominio de la URL actual
    const subdomain = router.asPath.split('.')[0].replace('https://', '');

    // Ajustar los meta tags según el subdominio
    const { title, description } = setMetaTagsBasedOnSubdomain(subdomain);

    // Actualizar los meta tags utilizando Next.js Head
    document.title = title;
    document.querySelector('meta[name="description"]').setAttribute('content', description);
  }, [router.asPath]);

  return <>
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <meta
        name="description"
        content="Software development and mentor, Jhon Agudelo"
      />
      <meta name="keywords" content="Jhon Sebastian,Agudelo Sierra,Jhon Agudelo,Desarrollador,
        jhon sebastian agudelo sierra,Desarrollador web,fullstack,
        Desarrollador de software,Desarrollador backend,Desarrollador frontend,mentor"/>
      <meta name="author" content="Jhon Sebastian Agudelo Sierra" />
      <meta name="copyright" content="Jhon Sebastian Agudelo Sierra" />
      <title>{"Grupo universitario San Juan Pablo II"}</title>

      {/*** Meta tags for social media ***/}
      {/* Essential META Tags */}
      <meta property="og:title" content="Grupo universitario San Juan Pablo II" />
      <meta property="og:description" content="Únete a nuestro grupo universitario de la parroquia y descubre cómo la educación y la fe pueden trabajar juntas para fortalecer tu camino. Aquí, encontrarás apoyo espiritual, amistad y un propósito que trasciende lo académico." />
      <meta property="og:image" content="https://www.jhonsebastianas.com/images/grupo-universitario/portfolio_presentation.png" />
      <meta property="og:url" content="https://www.jhonsebastianas.com/grupo-universitario" />
      <meta name="twitter:card" content="summary_large_image"></meta>
      {/* Non-Essential, But Recommended */}
      <meta property="og:site_name" content="Grupo universitario San Juan Pablo II."></meta>
      <meta name="twitter:image:alt" content="Preview website image"></meta>
    </Head>
    <Component {...pageProps} />
  </>
}

export default MyApp