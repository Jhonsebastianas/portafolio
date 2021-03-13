import React, { useState } from 'react'
import ImageNext from 'next/image'
import Link from 'next/link'
import { Card, Container, Grid, Header, Transition } from 'semantic-ui-react'
import listaProyectos from '@constants/Proyects'
const src = '/images/white-image.png'

const colors = ["red", "orange", "blue"]

const Proyectos = () => {
    return (
        <Container>
            <br></br>
            <Header as='h2' icon textAlign='center' className="text-white">
                <Header.Content>Proyectos personales</Header.Content>
            </Header>
            <br />
            <Grid columns="equal" stackable>
                <Grid.Column></Grid.Column>
                <Grid.Column>
                    <Card.Group itemsPerRow={1} stackable>
                        {listaProyectos.map(proyecto => {
                            return (
                                <Link href={`proyecto/${proyecto.id}`}>
                                    <Card color={colors[(proyecto.id - 1)]}
                                        image={<ImageNext src={`/images/projects/${proyecto.imagen}`}
                                            alt={proyecto.imagen} width="auto" height="auto" />}
                                        className="card-proyect"
                                    />
                                </Link>
                            )
                        })}
                    </Card.Group>
                </Grid.Column>
                <Grid.Column></Grid.Column>
            </Grid>

        </Container>
    )
}

export default Proyectos