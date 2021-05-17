import React, { useEffect } from 'react'
import ButtonQualification from '@components/commons/button-qualification'
import QualificationContent from '@components/commons/qualification'
import StyledComponents from 'styled-components'

const StyledQualification = StyledComponents.section`
    .qualification__tabs {
        display: flex;
        justify-content: space-evenly;
        margin-bottom: var(--mb-2);
    }

    [data-content] {
        display: none;
    }

    .qualification__active[data-content] {
        display: block;
    }
`

const listQualifications = [
    {
        title: 'Technology in Data Systematization',
        subtitle: 'Colombia - PCJIC',
        calendar: '2020 - 2022'
    },
    {
        title: 'Professional technical in software development',
        subtitle: 'Colombia - PCJIC',
        calendar: '2018 - 2019'
    },
    {
        title: 'Technical Bachelor in Software Programming',
        subtitle: 'Colombia - Concejo de Medellín',
        calendar: '2017 - 2018'
    },
]

const listWorks = [
    {
        title: 'Analyst development',
        subtitle: 'Quipux S.A.S - Colombia',
        calendar: '2019 - Present'
    },
    {
        title: 'Automated software testing',
        subtitle: 'Quipux S.A.S - Colombia',
        calendar: '2019 - Present (occasionally)'
    },
    {
        title: 'Students mentor',
        subtitle: 'PCJIC - Colombia',
        calendar: '2019 - 2020'
    },
]

/** Qualification tabs */
const qualificationTabs = () => {
    const tabs = document.querySelectorAll('[data-target]'),
        tabContents = document.querySelectorAll('[data-content]')

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = document.querySelector(tab.dataset.target)

            tabContents.forEach(tabContent => {
                tabContent.classList.remove('qualification__active')
            })
            target.classList.add('qualification__active')
            tabs.forEach(tab => {
                tab?.classList.remove('qualification__active')
            })
            // tab.classList.remove('qualification__active')
            tab.classList.add('qualification__active')
        })
    })
}


const Qualification = () => {

    useEffect(() => {
        let mounted = true
        if (mounted) {
            qualificationTabs()
        }
        return () => mounted = false;
    }, [])
    return (
        <StyledQualification className="qualification section">
            <h2 className="section__title">Qualification</h2>
            <span className="section__subtitle">My personal journey</span>

            <div className="qualification__container container">
                <div className="qualification__tabs">
                    <ButtonQualification className="qualification__button button--flex qualification__active" data-target="#education">
                        <i className="uil uil-graduation-cap qualification__icon"></i>
                        Education
                    </ButtonQualification>
                    <ButtonQualification className="qualification__button button--flex" data-target="#work">
                        <i className="uil uil-briefcase-alt qualification__icon"></i>
                        Work
                    </ButtonQualification>
                </div>
                <div className="qualification__sections">
                    <div className="qualification__content qualification__active" data-content id="education">
                        {listQualifications.map((qualification, index) => {
                            return <QualificationContent qualification={qualification} index={index} size={listQualifications.length} />
                        })}
                    </div>
                    <div className="qualification__content" data-content id="work">
                        {listWorks.map((work, index) => {
                            return <QualificationContent qualification={work} index={index} size={listQualifications.length} />
                        })}
                    </div>
                </div>

            </div>
        </StyledQualification>
    )
}

export default Qualification