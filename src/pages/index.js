import Head from 'next/head'
import styles from '@styles/Home.module.css'
import Layout from '@components/layouts/Layout'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main className={styles.main}>
          <h1 className={styles.title}>
            Jhon Agudelo
          </h1>
          <h2>
            portafolio
          </h2>
        </main>
      </Layout>
    </div>
  )
}
