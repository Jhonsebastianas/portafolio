import React from 'react'
import StyledComponents from 'styled-components'

const StyledInterestsContainer = StyledComponents.div`
    grid-template-columns: repeat(3, 1fr);
    margin-top: var(--mb-2);

    @media screen and (min-width: 968px) {
        grid-template-columns: repeat(5, max-content);
        column-gap: 3.5rem !important;
    }
`

const StyledInterestsConent = StyledComponents.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    .interests__icon {
        font-size: 1.5rem;
        color: var(--text-color-light);
        margin-bottom: .25rem;
    }
`

const Interests = () => {
    return (
        <section className="interests section">
            <h2 className="section-title">Interests</h2>

            <StyledInterestsContainer className="interests__container bd-grid">
                <StyledInterestsConent className="interests__content">
                    <i className="uil uil-headphones-alt interests__icon"></i>
                    <span className="interests__name">Music</span>
                </StyledInterestsConent>

                <StyledInterestsConent className="interests__content">
                    <i className="uil uil-plane-departure interests__icon"></i>
                    <span className="interests__name">Travel</span>
                </StyledInterestsConent>

                <StyledInterestsConent className="interests__content">
                    <i className="uil uil-book-open interests__icon"></i>
                    <span className="interests__name">Learn</span>
                </StyledInterestsConent>

                <StyledInterestsConent className="interests__content">
                    <i className="uil uil-book-reader interests__icon"></i>
                    <span className="interests__name">Teach</span>
                </StyledInterestsConent>

                <StyledInterestsConent className="interests__content">
                    <i className="uil uil-user-nurse interests__icon"></i>
                    <span className="interests__name">Hapkido</span>
                </StyledInterestsConent>
            </StyledInterestsContainer>
        </section>
    )
}

export default Interests