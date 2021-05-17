import React, { useEffect } from 'react'
import StyledComponents from 'styled-components'
import Skill from '@components/commons/skill'

const StyledSkillsContainer = StyledComponents.div`
    row-gap: 0;
`

const abilities = [
    {
        title: 'Backend developer',
        subtitle: 'More than 3 years',
        icon: 'uil-server-network-alt',
        skills: [
            {
                name: 'Java',
                percentage: '80%',
            },
            {
                name: 'Node.js',
                percentage: '70%',
            },
            {
                name: 'Express.js',
                percentage: '70%',
            },
            {
                name: 'Oracle',
                percentage: '50%',
            },
            {
                name: 'Mongodb',
                percentage: '60%',
            },
        ],
    },
    {
        title: 'Frontend developer',
        subtitle: 'More than 3 years',
        icon: 'uil-brackets-curly',
        skills: [
            {
                name: 'JavaScript',
                percentage: '85%',
            },
            {
                name: 'React.js',
                percentage: '75%',
            },
            {
                name: 'Angular.js',
                percentage: '60%',
            },
            {
                name: 'CSS',
                percentage: '50%',
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
            },
            {
                name: 'Raspberry pi',
                percentage: '50%',
            },
            {
                name: 'C++',
                percentage: '30%',
            },
            {
                name: 'Arduino',
                percentage: '30%',
            },
        ],
    },
]

const accordionSkills = () => {
    const skillsContent = document.getElementsByClassName('skills__content'),
        skillsHeader = document.querySelectorAll('.skills__header')

    function toggleSkills() {
        let itemClass = this.parentNode.className

        for (let i = 0; i < skillsContent.length; i++) {
            skillsContent[i].className = 'skills__content skills__close'
        }

        if (itemClass === 'skills__content skills__close') {
            this.parentNode.className = 'skills__content skills__open'
        }
    }

    skillsHeader.forEach(el => el.addEventListener('click', toggleSkills))
}

const Skills = () => {

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            accordionSkills()
        }
        return () => mounted = false
    }, [])

    return (
        <section className="skills section" id="skills">
            <h2 className="section__title">Skills</h2>
            <span className="section__subtitle">My technical level</span>
            <StyledSkillsContainer className="skills__container container grid">
                {abilities.map((skill, index) => <Skill skill={skill} index={index} />)}
            </StyledSkillsContainer>
        </section>
    )
}

export default Skills