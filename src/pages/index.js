// import styles from '@styles/Home.module.css'
import Layout from '@components/layouts/Layout'
import Home2 from '@components/sections/Home'
import About from '@components/sections/AboutNew'
import Skills from '@components/sections/Skills'
import Qualification from '@components/sections/Qualification'
import Services from '@components/sections/Services'
import PortFolio from '@components/sections/Portfolio'

// import Footer from '@components/layouts/Footer'
// import CollaboratedWith from '@components/hooks/CollaboratedWith'
// import About from '@components/sections/About'
// import Hero from '@components/sections/Hero'
// import Featured from '@components/sections/Features'
// import Contact from '@components/sections/Contact'

export default function Home() {
  return (
    <Layout>
      <Home2 />
      <About />
      <Skills />
      <Qualification />
      <Services />
      <PortFolio />
    </Layout>
    // <div className={styles.container}>
    //   <Layout>
    //     <Hero />
    //     <About />
    //     <Featured />
    //     <CollaboratedWith />
    //     <Contact />
    //   </Layout>
    // </div>
  )
}
