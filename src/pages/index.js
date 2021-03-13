import styles from '@styles/Home.module.css'
import Layout from '@components/layouts/Layout'
import CollaboratedWith from '@components/hooks/CollaboratedWith'
import About from '@components/sections/About'
import Hero from '@components/sections/Hero'
import Featured from '@components/sections/Features'

export default function Home() {
  return (
    <div className={styles.container}>
      <Layout>
        <Hero />
        <About />
        <Featured />
        <CollaboratedWith />
      </Layout>
    </div>
  )
}
