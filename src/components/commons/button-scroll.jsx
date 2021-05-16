import React from 'react'
import StyledComponents from 'styled-components'

const StyleButton = StyledComponents.div`
    display: none;

    .home__scroll-button {
        color: var(--first-color);

        transition: .3s;

        &:hover {
            transform: translateY(.25rem);
        }
    }

    .home__scroll-mouse {
        font-size: 2rem;
    }

    .home__scroll-name {
        font-size: var(--small-font-size);
        color: var(--title-color);
        font-weight: var(--font-medium);
        margin-right: var(--mb-0-25);
    }

    .home__scroll-arrow {
        font-size: 1.25rem;
    }
`

const ScrollButton = () => {
    return (
        <StyleButton className="home__scroll">
            <a href="#about" className="home__scroll-button button--flex">
                <i className="uil uil-mouse-alt home__scroll-mouse"></i>
                <span className="home__scroll-name">Scroll down</span>
                <i className="uil uil-arrow-down home__scroll-arrow"></i>
            </a>
        </StyleButton>
    )
}

export default ScrollButton

