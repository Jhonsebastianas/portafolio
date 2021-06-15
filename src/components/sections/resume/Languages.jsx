import React from 'react'
import StyledComponents from 'styled-components'

const StyledLanguageContent = StyledComponents.ul`
    grid-template-columns: repeat(2, 1fr);
    gap: 0;

    .languagues__name {
        display: flex;
        align-items: center;
        margin-bottom: var(--mb-3);
    }

    .languages__circle {
        display: inline-block;
        width: 5px;
        height: 5px;
        background-color: var(--text-color);
        border-radius: 50%;
        margin-right: .75rem;
    }

    @media screen and (min-width: 968px) {
        grid-template-columns: repeat(3, max-content);
        column-gap: 3.5rem !important;
    }
`

const Languages = () => {
    return (
        <section className="languages section">
            <h2 className="section-title">Languages</h2>

            <div className="languages__container">
                <StyledLanguageContent className="languages__content bd-grid">
                    <li className="languagues__name">
                        <span className="languages__circle"></span> Spanish (Fully fluent)
                    </li>
                    <li className="languagues__name">
                        <span className="languages__circle"></span> English (Reading)
                    </li>
                </StyledLanguageContent>
            </div>
        </section>
    )
}

export default Languages