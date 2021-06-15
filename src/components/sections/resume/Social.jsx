import React from 'react'
import StyledComponents from 'styled-components'

const StyledSocialContainer = StyledComponents.div`
    grid-template-columns: max-content;
    gap: 1rem !important;

    .social__link {
        display: inline-flex;
        align-items: center;
        font-size: var(--small-font-size);
        color: var(--text-color);

        &:hover {
            color: var(--title-color);
        }
    }

    .social__icon {
        font-size: 1.2rem;
        margin-right: .25rem;
    }
`

const Social = () => {
    return (
        <section className="social section">
            <h2 className="section-title">SOCIAL</h2>

            <StyledSocialContainer className="social__container bd-grid">
                <a className="social__link" href="https://www.linkedin.com/in/jhonsabastianas/" rel="noopener noreferrer" target="_blank">
                    <i className="uil uil-linkedin-alt social__icon"></i> @jhonsebastianas
                </a>
                <a className="social__link" href="https://jhonsebastianas.medium.com/" rel="noopener noreferrer" target="_blank">
                    <i className="uil uil-medium-m social__icon"></i> @jhonsebastianas
                </a>
                <a className="social__link" href="https://github.com/segaretsu" rel="noopener noreferrer" target="_blank">
                <i className="uil uil-github-alt social__icon"></i> @segaretsu
                </a>
            </StyledSocialContainer>
        </section>
    )
}

export default Social