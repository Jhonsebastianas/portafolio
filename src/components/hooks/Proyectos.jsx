import React from 'react'
import ImageNext from 'next/image'
import { Card, Container, Header } from 'semantic-ui-react'
import listaProyectos from '@constants/Proyects'
const src = '/images/white-image.png'

const colors = ["red", "orange", "blue"]

const Proyectos = () => {
    return (
        <Container>
            <Header as='h2' icon textAlign='center'>
                <Header.Content>Proyectos</Header.Content>
            </Header>
            <Card.Group itemsPerRow={3} stackable>
                {listaProyectos.map(proyecto => {
                    return (
                        <Card color={colors[(proyecto.id - 1)]} 
                            image={<ImageNext src={`/images/projects/${proyecto.imagen}`} alt={proyecto.imagen} width="auto" height="auto" />} 
                            className="card-proyect"
                        />
                    )
                })}
            </Card.Group>
        </Container>
    )
}

export default Proyectos