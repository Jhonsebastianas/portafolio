import React, { useRef, useState } from 'react'
import { Container, Divider, Grid, Header, Icon, List, Menu, Segment } from 'semantic-ui-react'
import WorksAndRoles from '@constants/WorksAndRoles'

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
                        </Menu>
                    </Grid.Column>
                    <Grid.Column width={16}>
                        {WorksAndRoles.map(work => {
                            if (activeItem === work.item) {
                                return <WorksAndRolesList work={work} />
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

const WorksAndRolesList = (props) => {
    const { work } = props
    const { roles, companyURL, companyName } = work
    return (
        <>
            {roles.map(cargo => {
                const { rol, otherCompanyName, otherCompanyURL, tasks, time: { start, end } } = cargo
                return (
                    <Grid className="fade-in">
                        <Grid.Column width={16}>
                            <h3 className="text-white">{rol} <a className="text-green" rel="noreferrer" href={(otherCompanyURL != '') ? otherCompanyURL : companyURL} target="_blank">@{(otherCompanyName != '') ? otherCompanyName : companyName}</a></h3>
                            <p className="text-light-slate">{start} - {end}</p>
                        </Grid.Column>
                        <Grid.Column width={16}>
                            <WorkTasks tasks={tasks}/>
                        </Grid.Column>
                    </Grid>
                )
            })}
        </>
    )
}

const WorkTasks = (props) => {
    const { tasks } = props
    return (
        <List>
            {tasks.map(task => {
                return (
                    <List.Item>
                        <Icon className="text-green" name="angle right" />
                        {task}
                    </List.Item>
                )
            })}
        </List>
    )
}

export default CollaboratedWith