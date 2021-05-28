import React from 'react'
import StyledComponents from 'styled-components'

const StyleQualification = StyledComponents.div`
    
    .qualification__data {
        display: grid;
        grid-template-columns: 1fr max-content 1fr;
        column-gap: 1.5rem;
    }

    .qualification__title {
        font-size: var(--normal-font-size);
        font-weight: var(--font-medium);
    }

    .qualification__subtitle {
        display: inline-block;
        font-size: var(--small-font-size);
        margin-bottom: var(--mb-1);
    }

    .qualification__calendar {
        font-size: var(--smaller-font-size);
        color: var(--text-color-light);
    }

    .qualification__calendar .uil-calendar-alt {
        margin-right: var(--mb-0-25);
    }

    .qualification__rounder {
        display: inline-block;
        width: 13px;
        height: 13px;
        background-color: var(--first-color);
        border-radius: 50%;
    }

    .qualification__line {
        display: block;
        width: 1px;
        height: 100%;
        background-color: var(--first-color);
        transform: translate(6px, -7px);
    }
`

const Qualification = (props) => {

    const { index, qualification: { title, subtitle, calendar }, size, typeQualification } = props

    const isPair = index % 2 == 0
    const isFinalQualification = index === size - 1
    const isSizePair = size % 2 == 0

    const getOddQualification = () => {
        return (<>
            <div></div>
            <div>
                <span className="qualification__rounder"></span>
                <span className="qualification__line"></span>
            </div>
        </>)
    }

    const getPairQualification = () => {
        return (<>
            <div>
                <span className="qualification__rounder"></span>
                <span className="qualification__line"></span>
            </div>
        </>)
    }

    const getFinalQualification = () => {
        return (<>
            <div>
                <span className="qualification__rounder"></span>
            </div>
        </>)
    }

    const getFinalPairQualification = () => {
        return (<>
            <div></div>
            <div>
                <span className="qualification__rounder"></span>
            </div>
        </>)
    }

    return (
        <StyleQualification key={index}>
            <div className="qualification__data">

                {!(isPair) && !(isFinalQualification) ? getOddQualification() : ''}

                {(isFinalQualification) && (isSizePair) ? getFinalPairQualification() : ''}

                <div>
                    <h3 className="qualification__title">{title}</h3>
                    <span className="qualification__subtitle">{subtitle}</span>
                    <div className="qualification__calendar">
                        <i className="uil uil-calendar-alt"></i>
                        {calendar}
                    </div>
                </div>

                {(isPair) && !(isFinalQualification) ? getPairQualification() : ''}

                {(isFinalQualification) && !(isSizePair) ? getFinalQualification() : ''}

            </div>
        </StyleQualification>
    )
}

export default Qualification

