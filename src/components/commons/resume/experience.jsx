import React from 'react'
import StyledComponents from 'styled-components'

const StyledExperienceContent = StyledComponents.div`
    display: flex;

    .experience__time {
        padding-right: 1rem;
    }

    .experience__rounder {
        position: relative;
        display: block;
        width: 16px;
        height: 16px;
        background-color: var(--text-color-light);
        border-radius: 50%;
        margin-top: .25rem;
    }

    .experience__line {
        display: block;
        width: 2px;
        height: 110%;
        background-color: var(--text-color-light);
        transform: translate(7px, 0);
    }
`

const StyledExperienceData = StyledComponents.div`
    gap: .5rem !important;

    .experience__title {
        font-size: var(--h3-font-size);
    }

    .experience__company {
        font-size: var(--small-font-size);
        color: var(--title-color);
    }
`

const experience = (props) => {

    const { experience: { calendar, company, description, title }, index, size } = props

    const fromCompany = `From ${calendar.replace('-', 'to')} | ${company}`

    return (
        <StyledExperienceContent className="experience__content" key={index}>
            <div className="experience__time">
                <span className="experience__rounder"></span>
                {(size - 1) != index && <span className="experience__line"></span>}
            </div>

            <StyledExperienceData className="experience__data bd-grid">
                <h3 className="experience__title">{title}</h3>
                <span className="experience__company">{fromCompany}</span>
                <p className="experience__description">
                    {description}
                </p>
            </StyledExperienceData>
        </StyledExperienceContent>
    )
}


export default experience