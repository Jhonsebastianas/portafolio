import React from 'react'
import Link from 'next/link'
import ImageNext from 'next/image'
import Proyectos from '@constants/Proyects'
import { Button, Grid, Header, Segment } from 'semantic-ui-react';

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

    const getSiguienteProyecto = () => {
        if (id == Proyectos.length) {
            return 1
        } else {
            return parseInt(id) + 1;
        }
    }

    const getAnteriorProyecto = () => {
        if (id == 1) {
            return Proyectos.length
        } else {
            return parseInt(id) - 1;
        }
    }

    return (
        <div className="contenedor-proyecto">
            <Segment vertical>
                <Grid stackable columns='equal' reversed>
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
                        <Link href="/"><a>volver al inicio</a></Link>
                        <br></br>
                        <br></br>
                        <br></br>
                        {/* <Grid.Column width={16} verticalAlign="bottom">
                            <Button.Group fluid>
                                <Link href={`/proyecto/${getAnteriorProyecto()}`}><a className="ui button">Anterior</a></Link>
                                <Button.Or text="ver" />
                                <Link href={`/proyecto/${getSiguienteProyecto()}`}><a className="ui button">Siguiente</a></Link>
                            </Button.Group>
                        </Grid.Column> */}
                    </Grid.Column>
                    <Grid.Column width={7} className="imagen-proyecto">
                        <Link href={urlSitio}>
                            <a target="_blank" rel="noreferrer">
                                <ImageNext
                                    src={srcImage}
                                    alt={imagen}
                                    // width="1200px"
                                    // height="750px"
                                    layout="fill"
                                />
                            </a>
                        </Link>
                    </Grid.Column>
                </Grid>
            </Segment>
        </div>
    )
}

export default Proyecto