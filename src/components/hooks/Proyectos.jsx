import React from 'react'
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
                        <Card color={colors[(proyecto.id - 1)]} image={`/images/projects/${proyecto.imagen}`} alt="eso" />
                    )
                })}
                {/* <Card color='red' image={src} />
                <Card color='orange' image={src} />
                <Card color='yellow' image={src} />
                <Card color='olive' image={src} />
                <Card color='green' image={src} />
                <Card color='teal' image={src} /> */}
            </Card.Group>
        </Container>
    )
}

export default Proyectos