import React from 'react'
import StyledComponent from 'styled-components'

const StyledPortfolioContent = StyledComponent.div`
    padding: 0 4.5rem;

    .portfolio__img {
        // width: 265px;
        border-radius: .5rem;
        justify-self: center;
    }

    .portfolio__title {
        font-size: var(--h3-font-size);
        margin-bottom: var(--mb-0-5);
    }

    .portfolio__description {
        margin-bottom: var(--mb-0-75);
    }

    .portfolio__button {
        &:hover .button__icon {
            transform: translateX(.25rem);
        }
    }
`


const PortfolioProject = (props) => {
    const { project: { title, description, img, url } } = props

    const rutaImagen = `images/projects/${img}`

    return (
        <StyledPortfolioContent className="portfolio__content grid swiper-slide">
            <img src={rutaImagen} alt={title} className="portfolio__img" />
            <div className="portfolio__data">
                <h3 className="portfolio__title">{title}</h3>
                <p className="portfolio__description">{description}</p>
                <a className="button button--flex button--small portfolio__button" href={url} target="_blank"
                    rel="noopener noreferrer">
                    Demo <i className="uil uil-arrow-right button__icon"></i>
                </a>
            </div>
        </StyledPortfolioContent>
    )
}

export default PortfolioProject