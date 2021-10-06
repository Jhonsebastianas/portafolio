import React from 'react';
import Image from 'next/image'
import StyledComponent from 'styled-components';

const StyledPortfoliosContainer = StyledComponent.section`
    gap: 1.5rem;
    grid-template-columns: repeat(2, 1fr);
`

const StyledPortfolio = StyledComponent.div`
    padding: 10px;
    border-radius: 20px;
    &:hover {
        // background-color: black;

        .portfolio__image-container {
            with: 100%;
            background-color: black;
        }

        .portfolio__content {
            background-color: var(--first-color);
        }
    }
`

const StyledImageContainer = StyledComponent.div`
    transition: .4s;
`

const StyledContentContainer = StyledComponent.div`
    // transition: .4s;
`

const StyledFilter = StyledComponent.div`
    padding: 0 15px;
    width: 100%;
    text-align: center;

    .portfolio__filter-btn {
        margin: 0 4px 10px;
        padding: 4px 10px;
        border: none;
        border-radius: 4px;
        background-color: var(--text-color-light);
        color: #FFF;

        display: inline-block;
        cursor: pointer;
        // UTIL
        text-transform: capitalize;
    }

    .portfolio__filter-btn.active {
        background-color: var(--first-color);
        cursor: auto;
    }
`

const SytledItems = StyledComponent.div`

    gap: 1.5rem;
    grid-template-columns: repeat(3, 1fr);

    .portfolio__item {
        // width: calc((100% / 3) - 30px);
        margin: 0 15px 30px;
    }

    // center button
    .btn {
        color: var(--text-color);
        background-color: var(--input-color);
        padding: 9px 25px;
        font-family: inherit;
        font-size: var(--normal-font-size);
    }

    .portfolio__item-thumbnail {
        position: relative;

        &:before, &:after {
            content: '';
            position: absolute;
            left: 0;
            height: 50%;
            width: 100%;
            background-color: var(--first-color);
            opacity: 0.8;
        }

        &:before {
            top: 0;
        }

        &:after {
            bottom: 0;
        }

        // center button
        & .btn {
            position: absolute;
            left: 50%;
            top: 50%;
            z-index: 1;
            transform: translate(-50%, -50%);
        }
    }
    
    .portfolio__item img {
        width: 100%;
    }

    .portfolio__item-details {
        display: none;
    }
`

const PortfolioPage = () => {
    return (
        <section className="section">
            <h2 className="section__title">Portfolio</h2>
            <span className="section__subtitle">Featured projects and more</span>

            <StyledFilter className="portfolio__filter">
                <button type="button" title="Show All Works" className="portfolio__filter-btn active" data-filter="all">all</button>
                <button type="button" title="Filter by Frontend" className="portfolio__filter-btn" data-filter="frontend">frontend</button>
                <button type="button" title="Filter by backend" className="portfolio__filter-btn" data-filter="backend">backend</button>
                <button type="button" title="Filter by Others" className="portfolio__filter-btn" data-filter="others">others</button>
            </StyledFilter>

            <SytledItems className="portfolio__items container grid">
                {/* portfolio item start */}
                <div className="portfolio__item" data-category="frontend,backend">
                    <div className="portfolio__item-thumbnail">
                        <img src="/images/projects/controlsep.webp" alt="thumbnail" />
                        <button type="button" className="btn more-info-btn">more info</button>
                    </div>
                    <h3 className="portfolio__item-title">Controlsep</h3>
                    <div className="portfolio__item-details">
                        <div className="description">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla, totam aperiam fugit atque tempore iste sequi ipsum aspernatur nesciunt eaque ex quas! Ut commodi nihil mollitia sunt sint! Vitae culpa earum consequuntur voluptas delectus sint asperiores facilis molestias maxime dolorem praesentium aspernatur consectetur magnam harum, eum recusandae ipsam adipisci dolore?</p>
                        </div>
                        <div className="general-info">
                            <p>Created - <span>01 Jul 2020</span></p>
                            <p>Technologies Used - <span>Node.js, Express.js, React.js, Javascript, MongoDB, Mongoose</span></p>
                            <p>Role - <span>Fullstack developer</span></p>
                            <p>View Online - <span><a href="https://controlsep.com/" target="_blank">https://controlsep.com/</a></span></p>
                        </div>
                    </div>
                </div>
                {/* portfolio item end */}
                {/* portfolio item start */}
                <div className="portfolio__item" data-category="frontend,backend">
                    <div className="portfolio__item-thumbnail">
                        <img src="/images/projects/Tagmascota.png" alt="thumbnail" />
                        <button type="button" className="btn more-info-btn">more info</button>
                    </div>
                    <h3 className="portfolio__item-title">Tagmascota</h3>
                    <div className="portfolio__item-details">
                        <div className="description">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla, totam aperiam fugit atque tempore iste sequi ipsum aspernatur nesciunt eaque ex quas! Ut commodi nihil mollitia sunt sint! Vitae culpa earum consequuntur voluptas delectus sint asperiores facilis molestias maxime dolorem praesentium aspernatur consectetur magnam harum, eum recusandae ipsam adipisci dolore?</p>
                        </div>
                        <div className="general-info">
                            <p>Created - <span>02 Ene 2021</span></p>
                            <p>Technologies Used - <span>Node.js, Express.js, React.js, Javascript, MongoDB, Mongoose</span></p>
                            <p>Role - <span>Fullstack developer</span></p>
                            <p>View Online - <span><a href="https://tagmascotas.vercel.app/" target="_blank">https://tagmascotas.vercel.app/</a></span></p>
                        </div>
                    </div>
                </div>
                {/* portfolio item end */}
                {/* portfolio item start */}
                <div className="portfolio__item" data-category="others">
                    <div className="portfolio__item-thumbnail">
                        <img src="/images/projects/controlsep.png" alt="thumbnail" />
                        <button type="button" className="btn more-info-btn">more info</button>
                    </div>
                    <h3 className="portfolio__item-title">Controlsep</h3>
                    <div className="portfolio__item-details">
                        <div className="description">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla, totam aperiam fugit atque tempore iste sequi ipsum aspernatur nesciunt eaque ex quas! Ut commodi nihil mollitia sunt sint! Vitae culpa earum consequuntur voluptas delectus sint asperiores facilis molestias maxime dolorem praesentium aspernatur consectetur magnam harum, eum recusandae ipsam adipisci dolore?</p>
                        </div>
                        <div className="general-info">
                            <p>Created - <span>01 Jul 2020</span></p>
                            <p>Technologies Used - <span>Node.js, Express.js, React.js, Javascript</span></p>
                            <p>Role - <span>Fullstack developer</span></p>
                            <p>View Online - <span><a href="https://controlsep.com/" target="_blank">https://controlsep.com/</a></span></p>
                        </div>
                    </div>
                </div>
                {/* portfolio item end */}
                {/* portfolio item start */}
                <div className="portfolio__item" data-category="backend,others">
                    <div className="portfolio__item-thumbnail">
                        <img src="/images/projects/controlsep.png" alt="thumbnail" />
                        <button type="button" className="btn more-info-btn">more info</button>
                    </div>
                    <h3 className="portfolio__item-title">Controlsep</h3>
                    <div className="portfolio__item-details">
                        <div className="description">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla, totam aperiam fugit atque tempore iste sequi ipsum aspernatur nesciunt eaque ex quas! Ut commodi nihil mollitia sunt sint! Vitae culpa earum consequuntur voluptas delectus sint asperiores facilis molestias maxime dolorem praesentium aspernatur consectetur magnam harum, eum recusandae ipsam adipisci dolore?</p>
                        </div>
                        <div className="general-info">
                            <p>Created - <span>01 Jul 2020</span></p>
                            <p>Technologies Used - <span>Node.js, Express.js, React.js, Javascript</span></p>
                            <p>Role - <span>Fullstack developer</span></p>
                            <p>View Online - <span><a href="https://controlsep.com/" target="_blank">https://controlsep.com/</a></span></p>
                        </div>
                    </div>
                </div>
                {/* portfolio item end */}
            </SytledItems>
            <StyledPortfoliosContainer className="container grid">
                <StyledPortfolio>
                    <Image
                        src="/images/white-image.png"
                        alt="imagenPrueba"
                        width="auto"
                        height="auto"
                    />
                    <h1>Titulo</h1>
                    <p>descripción</p>
                </StyledPortfolio>
                <StyledPortfolio>
                    <StyledImageContainer className="portfolio__image-container">
                        <Image
                            src="/images/white-image.png"
                            alt="imagenPrueba"
                            width="auto"
                            height="auto"
                        />
                    </StyledImageContainer>
                    <StyledContentContainer className="portfolio__content">
                        <h1>Titulo</h1>
                        <p>descripción</p>
                    </StyledContentContainer>
                </StyledPortfolio>
                <StyledPortfolio>
                    <Image
                        src="/images/white-image.png"
                        alt="imagenPrueba"
                        width="auto"
                        height="auto"
                    />
                    <h1>Titulo</h1>
                    <p>descripción</p>
                </StyledPortfolio>
            </StyledPortfoliosContainer>
        </section>
    )
}

export default PortfolioPage;