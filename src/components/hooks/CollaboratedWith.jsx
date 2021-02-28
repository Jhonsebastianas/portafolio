import React, { useEffect, useRef, useState } from 'react'
import { Container, Divider, Grid, Header, Icon, List, Menu, Segment } from 'semantic-ui-react'
import Works from '@constants/Works'

const CollaboratedWith = () => {
    const [activeItem, setActiveItem] = useState('Quipux')

    const ref = useRef(null)

    const handleItemClick = (e, { name }) => {
        setActiveItem(name)
    }

    return (<>
        <Divider />
        <Segment vertical ref={ref}>
            <Header as='h2' icon textAlign='center'>
                <Header.Content>Donde he trabajado</Header.Content>
            </Header>
            <Container>
                <Grid columns='16'>
                    <Grid.Column textAlign="left" width={16}>
                        <Menu pointing secondary >
                            <Menu.Item
                                name='Quipux'
                                active={activeItem === 'Quipux'}
                                onClick={handleItemClick}
                            />
                            <Menu.Item
                                name='PCJIC'
                                active={activeItem === 'PCJIC'}
                                onClick={handleItemClick}
                            />
                            <Menu.Item
                                name='Controlsep'
                                active={activeItem === 'Controlsep'}
                                onClick={handleItemClick}
                            />
                        </Menu>
                    </Grid.Column>
                    <Grid.Column width={12}>
                            {Works.map(work => {
                                if (activeItem === work.item) {
                                    return (
                                        <Grid className="fade-in">
                                            <Grid.Column width={16}>
                                                <h3>{work.rol} <a href={work.companyURL} target="_blank">@{work.companyName}</a></h3>
                                                <p>{work.time.start} - {work.time.end}</p>
                                            </Grid.Column>
                                            <Grid.Column width={16}>
                                                <List>
                                                    {work.tasks.map(task => {
                                                        return (
                                                            <List.Item>
                                                                <Icon name="angle right" />
                                                                {task}
                                                            </List.Item>
                                                        )
                                                    })}
                                                </List>
                                            </Grid.Column>
                                        </Grid>
                                    )
                                } else {
                                    return ''
                                }
                            })}
                    </Grid.Column>
                </Grid>
            </Container>

        </Segment>
    </>)
}

export default CollaboratedWith