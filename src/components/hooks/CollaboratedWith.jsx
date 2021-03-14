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
            <Header as='h2' icon textAlign='center' className="text-white">
                <Header.Content>Donde he trabajado</Header.Content>
            </Header>
            <Container>
                <Grid columns='16'>
                    <Grid.Column textAlign="left" width={16}>
                        <Menu pointing secondary color='teal' >
                            <Menu.Item className="text-green"
                                name='Quipux'
                                active={activeItem === 'Quipux'}
                                onClick={handleItemClick}
                            />
                            <Menu.Item className="text-green"
                                name='PCJIC'
                                active={activeItem === 'PCJIC'}
                                onClick={handleItemClick}
                            />
                            <Menu.Item className="text-green"
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
                                                <h3 className="text-white">{work.rol} <a className="text-green" rel="noreferrer" href={work.companyURL} target="_blank">@{work.companyName}</a></h3>
                                                <p className="text-light-slate">{work.time.start} - {work.time.end}</p>
                                            </Grid.Column>
                                            <Grid.Column width={16}>
                                                <List>
                                                    {work.tasks.map(task => {
                                                        return (
                                                            <List.Item>
                                                                <Icon className="text-green" name="angle right" />
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