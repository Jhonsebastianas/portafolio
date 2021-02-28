import Head from 'next/head'
import styles from '@styles/Home.module.css'
import Layout from '@components/layouts/Layout'
import { APP_NAME } from '@constants/Constants'
import { Container, Grid, Header, Segment } from 'semantic-ui-react'
import Proyectos from '@components/hooks/Proyectos'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>{APP_NAME}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main className={styles.main}>
          <h1 className={styles.title}>
            Jhon Agudelo
          </h1>
          <h2>{"<"}Analista desarrollador {"/>"}</h2>
        </main>
        <Segment id="about">
          <Container textAlign='center'>
            <Header as='h2' icon textAlign='center'>
              <Header.Content>👋 Acerca de mi</Header.Content>
            </Header>
            <hr></hr>
            <Grid columns="equal" stackable>
              <Grid.Column>
                <h4>¿Quien soy como porfesional?</h4>
                <p class="lead">Un apasionado desarrollador de software, con conocimientos en la cultura devops, automatización de pruebas  y procesos , apasionado por la tecnología, a contribuir a mejorar la calidad de vida de las personas, y con valores que velan por el crecimiento personal y profesional de quienes me rodean y propio.</p>
              </Grid.Column>
              <Grid.Column>
                <h4>Lo que más disfruto de mi trabajo</h4>
                <p class="lead">Una vez dijo Nikola Tesla: “No hay emoción más intensa para un inventor que ver una de sus creaciones funcionando”, y considero que así es. Lograr impactar la vida de las personas de una manera positiva con la tecnología es una de las cosas que más disfruto de mi trabajo, y las que más ilusión me hacen.</p>
              </Grid.Column>
            </Grid>
          </Container>
        </Segment>
        <Proyectos />
      </Layout>
    </div>
  )
}
