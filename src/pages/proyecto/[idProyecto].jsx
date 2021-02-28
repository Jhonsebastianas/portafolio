import React from 'react'
import Link from 'next/link'
import ImageNext from 'next/image'
import Proyectos from '@constants/Proyects'
import { Button, Container, Grid, Header, List, Segment } from 'semantic-ui-react';

export const getStaticProps = async ({ params }) => {
    const { idProyecto } = params;
    const proyecto = Proyectos.find(proyecto => proyecto.id === idProyecto);
    return {
        props: {
            proyecto,
        }
    }
}

/**
 * Este método nos permite indicarle a Nextjs cuantas páginas estáticas debe generar para esta ruta dinámica.
 */
export const getStaticPaths = async () => {
    const paths = Proyectos.map(({ id }) => ({
        params: {
            idProyecto: id.toString()
        }
    }));

    return {
        paths,
        // Incremental static generation
        // 404 for everything else
        fallback: false
    }
}

const Proyecto = ({ proyecto }) => {
    const { id, nombre, descripcion, habilidades, cargo, urlSitio, imagen, empresa, tiempo } = proyecto
    const srcImage = `/images/projects/${imagen}`
    return (
        <div className="contenedor-proyecto">
            <Segment vertical>
                <Grid stackable columns='equal'>
                    <Grid.Column width={9}>
                        <Header as='h1' icon textAlign='left'>
                            <Header.Content><a href={urlSitio} target="_blank">{nombre}</a></Header.Content>
                        </Header>
                        <Grid.Column width={16}>
                            <p>{descripcion}</p>
                        </Grid.Column>
                        <br></br>
                        <br></br>
                        <Grid width={16}>
                            <Grid.Column width={6}>
                                <h3>Cargo</h3>
                                {cargo}
                            </Grid.Column>
                            <Grid.Column width={5}>
                                <h3>Año</h3>
                                {tiempo}
                            </Grid.Column>
                            <Grid.Column width={5}>
                                <h3>Empresa</h3>
                                {empresa}
                            </Grid.Column>
                        </Grid>
                        <br></br>
                        <br></br>
                        <br></br>
                        <Grid.Column width={16}>
                            <Button><Link href="/"><a>Inicio</a></Link></Button>
                            <Button.Group>
                                {id != 1 && <>
                                    <Button><Link href={`/proyecto/${parseInt(id) - 1}`}><a>Anterior</a></Link></Button>
                                </>}
                                {(id != 1 && id != Proyectos.length) && <Button.Or text="ver" />}
                                {id != Proyectos.length && <>
                                    <Button><Link href={`/proyecto/${parseInt(id) + 1}`}><a>Siguiente</a></Link></Button>
                                </>}
                            </Button.Group>

                        </Grid.Column>
                    </Grid.Column>

                    <Grid.Column width={7}>
                        <ImageNext
                            src={srcImage}
                            width="1200px"
                            height="750px"
                            alt={imagen}
                        />
                    </Grid.Column>
                </Grid>
            </Segment>
        </div>
    )
}

export default Proyecto