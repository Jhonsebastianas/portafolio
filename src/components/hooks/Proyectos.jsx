import React, { useState } from 'react'
import ImageNext from 'next/image'
import Link from 'next/link'
import { Card, Container, Header, Transition } from 'semantic-ui-react'
import listaProyectos from '@constants/Proyects'
const src = '/images/white-image.png'

const colors = ["red", "orange", "blue"]

const Proyectos = () => {
    return (
        <Container>
            <br></br>
            <Header as='h2' icon textAlign='center'>
                <Header.Content>Proyectos</Header.Content>
            </Header>
            <br/>
            <Card.Group itemsPerRow={3} stackable>
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
        </Container>
    )
}

export default Proyectos