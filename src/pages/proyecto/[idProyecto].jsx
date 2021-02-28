import React from 'react'
import ImageNext from 'next/image'
import Proyectos from '@constants/Proyects'
import { Grid, Header, List, Segment } from 'semantic-ui-react';

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
    const { id, nombre, descripcion, habilidades, cargo, urlSitio, imagen } = proyecto
    const srcImage = `/images/projects/${imagen}`
    return (
        <>
            <Segment vertical>
                <Grid stackable columns='equal'>
                    <Grid.Column>
                        <ImageNext
                            src={srcImage}
                            width="1200px"
                            height="750px"
                            alt={imagen}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Header as='h1' icon textAlign='left'>
                            <Header.Content>{nombre}</Header.Content>
                        </Header>
                        <Grid.Column width={16}>
                            <h2>{cargo}</h2>
                        </Grid.Column>
                        <Grid.Column width={16}>
                            <p>{descripcion}</p>
                        </Grid.Column>
                        <br></br>
                        <Grid.Column width={16}>
                            <span>{habilidades}</span>
                        </Grid.Column>
                        <br></br>
                        <Grid.Column width={16}>
                            Ver sitio: <a href={urlSitio} target="_blank">{nombre}</a>
                            <br></br><br></br>
                            <a href="/">volver al inicio</a>
                        </Grid.Column>
                    </Grid.Column>
                </Grid>
            </Segment>

        </>
    )
}

export default Proyecto