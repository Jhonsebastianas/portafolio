import React from 'react'
import StyledComponents from 'styled-components'

const StyledEducationContent = StyledComponents.div`
    display: flex;

    .education__time {
        padding-right: 1rem;
    }

    .education__rounder {
        position: relative;
        display: block;
        width: 16px;
        height: 16px;
        background-color: var(--text-color-light);
        border-radius: 50%;
        margin-top: .25rem;
    }

    .education__line {
        display: block;
        width: 2px;
        height: 110%;
        background-color: var(--text-color-light);
        transform: translate(7px, 0);
    }
`

const StyledEducationData = StyledComponents.div`
    gap: .5rem !important;

    .education__title {
        font-size: var(--h3-font-size);
    }

    .education__studies {
        font-size: var(--small-font-size);
        color: var(--title-color);
    }

    .education__year {
        font-size: var(--smaller-font-size);
    }
`

const Education = (props) => {

    const { education: { title, subtitle, calendar }, index, size } = props

    return (
        <StyledEducationContent className="education__content" key={index}>
            <div className="education__time">
                <span className="education__rounder"></span>
                {(size - 1) != index && <span className="education__line"></span>}
            </div>

            <StyledEducationData className="education__data bd-grid">
                <h3 className="education__title">{title}</h3>
                <span className="education__studies">{subtitle}</span>
                <span className="education__year">{calendar}</span>
            </StyledEducationData>
        </StyledEducationContent>
    )
}

export default Education