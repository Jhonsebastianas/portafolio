import React from 'react'

import StyledComponents from 'styled-components' 

const StyledHome = StyledComponents.section`
    position: relative;
`

const StyledHomeContainer = StyledComponents.div`
    gap: 3rem !important;
`

const StyledHomeData = StyledComponents.div`
    gap: .5rem !important;
    text-align: center;

    .home__img {
        width: 150px;
        height: 165px;
        border-radius: 50%;
        justify-self: center;
        margin-bottom: var(--mb-1);
    }

    .home__title {
        font-size: var(--h1-font-size);
    }

    .home__profession {
        font-size: var(--normal-font-size);
        margin-bottom: var(--mb-1);
    }

    .home__button-movil {
        display: inline-block;
        border: 2px solid var(--text-color);
        color: var(--title-color);
        padding: 1rem 2rem;
        border-radius: .25rem;
        transition: .3s;
        font-weight: var(--font-medium);
        margin-top: var(--mb-3);

        &:hover {
            background-color: var(--text-color);
            color: var(--container-color);
        }
    }
`

const StyledHomeAddress = StyledComponents.div`
    gap: 1rem;

    .home__information {
        display: flex;
        align-items: center;
        font-size: var(--small-font-size);
    }

    .home__icon {
        font-size: 1.2rem;
        margin-right: .25rem;
    }
`

const Home = () => {
    return (
        <StyledHome className="home" id="home">
            <StyledHomeContainer className="home__container section bd-grid">
                <StyledHomeData className="home__data bd-grid">
                    <img src="/images/perfil.png" alt="Jhon Sebastian Agudelo Sierra" className="home__img" />

                    <h1 className="home__title">JHON <strong>SEBASTIAN</strong></h1>
                    <h2 className="home__profession">Web developer</h2>

                    {/* Button to download yout CV saved in the pdf folder. Available for mobile */}

                    <div>
                        <a download="" className="home__button-movil" target="_blank" href="pdf/CV-SebastianAgudelo-English.pdf" >
                            Download
                        </a>
                    </div>
                </StyledHomeData>

                <StyledHomeAddress className="home__address bg-grid">
                    <span className="home__information">
                        <i class="uil uil-map-marker home__icon"></i> Medellín - Colombia
                    </span>
                    <span className="home__information">
                        <i class="uil uil-envelope-alt home__icon"></i> jhonsebastianas@gmail.com
                    </span>
                    <span className="home__information">
                        <i class="uil uil-phone-alt home__icon"></i> +57 311 326 4747
                    </span>
                </StyledHomeAddress>
            </StyledHomeContainer>
        </StyledHome>
    )
}


export default Home