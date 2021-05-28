import React, { useEffect } from 'react'
import ButtonQualification from '@components/commons/button-qualification'
import QualificationContent from '@components/commons/qualification'
import Works from '@constants/qualification-work'
import Education from '@constants/qualification-education'
import Awards from '@constants/qualification-awards'

import StyledComponents from 'styled-components'

const StyledQualification = StyledComponents.section`
    .qualification__tabs {
        display: flex;
        justify-content: space-evenly;
        margin-bottom: var(--mb-2);
    }

    @media screen and (max-width: 280px) {
        .qualification__tabs {
            flex-direction: column;
        }
    }

    [data-content] {
        display: none;
    }

    .qualification__active[data-content] {
        display: block;
    }
`

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
                    <ButtonQualification className="qualification__button button--flex" data-target="#awards">
                        <i className="uil uil-award qualification__icon"></i>
                        Awards
                    </ButtonQualification>
                </div>
                <div className="qualification__sections">
                    <div className="qualification__content qualification__active" data-content id="education">
                        {Education.map((qualification, index) => {
                            return <QualificationContent qualification={qualification} index={index} size={Education.length} />
                        })}
                    </div>
                    <div className="qualification__content" data-content id="work">
                        {Works.map((work, index) => {
                            return <QualificationContent qualification={work} index={index} size={Works.length} />
                        })}
                    </div>
                    <div className="qualification__content" data-content id="awards">
                        {Awards.map((award, index) => {
                            return <QualificationContent qualification={award} index={index} size={Awards.length} />
                        })}
                    </div>
                </div>

            </div>
        </StyledQualification>
    )
}

export default Qualification