import React from 'react'
import StyledComponents from 'styled-components'
import Skill from '@components/commons/skill'

const StyledSkillsContainer = StyledComponents.div`
    row-gap: 0;
`

const abilities = [
    {
        title: 'Frontend developer',
        subtitle: 'More than 3 years',
        icon: 'uil-brackets-curly',
        skills: [
            {
                name: 'JavaScript',
                percentage: '85%',
                class: 'skills__js'
            },
            {
                name: 'React.js',
                percentage: '75%',
                class: 'skills__react'
            },
            {
                name: 'Angular.js',
                percentage: '60%',
                class: 'skills__angularjs'
            },
            {
                name: 'CSS',
                percentage: '50%',
                class: 'skills__css'
            },
        ],
    },
    {
        title: 'Backend developer',
        subtitle: 'More than 3 years',
        icon: 'uil-server-network-alt',
        skills: [
            {
                name: 'Java',
                percentage: '80%',
                class: 'skills__java'
            },
            {
                name: 'Node.js',
                percentage: '70%',
                class: 'skills__node'
            },
            {
                name: 'Oracle',
                percentage: '50%',
                class: 'skills__oracle'
            },
            {
                name: 'Mongodb',
                percentage: '60%',
                class: 'skills__mongodb'
            },
        ],
    },
    {
        title: 'Internet of things developer',
        subtitle: 'More than 1 years',
        icon: 'uil-intercom-alt',
        skills: [
            {
                name: 'Python',
                percentage: '60%',
                class: 'skills__python-iot'
            },
            {
                name: 'Raspberry pi',
                percentage: '50%',
                class: 'skills__raspberry'
            },
            {
                name: 'C++',
                percentage: '30%',
                class: 'skills__cplusplus-iot'
            },
            {
                name: 'Arduino',
                percentage: '30%',
                class: 'skills__arduino'
            },
        ],
    },
]

const Skills = () => {
    return (
        <section className="skills section" id="skills">
            <h2 className="section__title">Skills</h2>
            <span className="section__subtitle">My technical level</span>
            <StyledSkillsContainer className="skills_container container grid">
                {abilities.map((skill, index) => <Skill skill={skill} index={index} />)}
            </StyledSkillsContainer>
        </section>
    )
}

export default Skills