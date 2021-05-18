import React, { useEffect } from 'react'
import StyledComponents from 'styled-components'
import Skill from '@components/commons/skill'
import abilities from '@constants/skills-i-have'

const StyledSkillsContainer = StyledComponents.div`
    row-gap: 0;
`

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