import React, { useEffect } from 'react'
import Project from '@components/commons/portfolio'
import StyledComponent from 'styled-components'

const portfolioProjects = [
    {
        title: 'Controlsep',
        img: 'controlsep.png',
        description: `
            Controlsep es un proyecto creado...
        `
    },
    {
        title: 'Tagmascota',
        img: 'tagmascota.png',
        description: `
            Es un proyecto que brindar un punto de reporte 
            de mascotas perdidas y encontradas.
        `
    },
]

const StyledPortfolioContainer = StyledComponent.div`
    overflow: initial;

    .swiper-button-prev::after, 
    .swiper-button-next::after {
        content: '';
    }

    .swiper-portfolio-icon {
        font-size: 2rem;
        color: var(--first-color);
    }

    .swiper-button-next {
        right: -5.rem;
    }

    .swiper-button-prev {
        left: -5.rem;
    }

    .swiper-pagination-bullets {
        bottom: -2.5rem;
    }

    .swiper-pagination-bullet-active {
        background-color: var(--first-color);
    }

    .swiper-button-prev,
    .swiper-button-next,
    .swiper-pagination-bullet {
        outline: none;
    }
`

const swiperFunction = () => {
    let swiper = new Swiper('.portfolio__container', {
        cssMode: true,
        loop: true,

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    })
}

const Portfolio = () => {

    useEffect(() => {
        let mounted = true
        if (mounted) {
            swiperFunction()
        }
        return () => mounted = false
    }, [])

    return (
        <section className="portfolio section" id="portfolio">
            <h2 className="section__title">Portfolio</h2>
            <span className="section__subtitle">Featured projects</span>

            <StyledPortfolioContainer className="portfolio__container container swiper-container">
                <div className="swiper-wrapper">
                    {/** Portfolio 1 */}
                    {portfolioProjects.map((project, index) => {
                        return <Project project={project} index={index} />
                    })}
                </div>
                {/** Add Arrows */}
                <div className="swiper-button-next">
                    <i className="uil uil-angle-right swiper-portfolio-icon"></i>
                </div>
                <div className="swiper-button-prev">
                    <i className="uil uil-angle-left swiper-portfolio-icon"></i>
                </div>
                {/** Add Pagination */}
                <div className="swiper-pagination"></div>
            </StyledPortfolioContainer>
        </section>
    )
}

export default Portfolio