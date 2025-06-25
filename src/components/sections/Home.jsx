import React from 'react'
import StyledComponents from 'styled-components'
import ScrollButton from '@components/commons/button-scroll'
import Button from '@components/commons/button'
import { SOCIAL_MEDIA } from 'src/util/constants'
import { useGSAP } from '@gsap/react'

const StyledHomeContainer = StyledComponents.div`
    gap: 1rem;

    .home__content {
        grid-template-columns: .5fr 3fr;
        padding-top: 3.5rem;
        align-items: center;
    }

    .home__social {
        display: grid;
        grid-template-columns: max-content;
        row-gap: 1rem;
    }

    .home__social-icon {
        font-size: 1.25rem;
        color: var(--first-color);

        &:hover {
            color: var(--first-color-alt);
        }
    }

    .home__blob {
        width: 200px;
        fill: var(--first-color);
    }

    .home__blob-img {
        width: 250px;
    }

    .home__data {
        grid-column: 1/3;

        .home__title {
            font-size: var(--big-font-size);
        }

        .home__subtitle {
            font-size: var(--h3-font-size);
            color: var(--text-color);
            font-weight: var(--font-medium);
            margin-bottom: var(--mb-0-75);
        }

        .home__description {
            margin-bottom: var(--mb-2);
        }
    }
`

const Home = () => {

    useGSAP(() => {
        const animate = async () => {
            const { gsap } = await import("gsap");
            const { SplitText } = await import("gsap/all");
            const { ScrollTrigger } = await import("gsap/ScrollTrigger");
    

            const roleSplit = new SplitText('.home__title', { type: 'chars, words' });

            gsap.from(roleSplit.chars, {
                yPercent: 100,
                duration: 1,
                ease: 'expo.out',
                stagger: 0.05,
            });

            const paragraphSplit = new SplitText('.home__subtitle', { type: 'lines' });

            gsap.from(paragraphSplit.lines, {
                opacity: 0,
                yPercent: 100,
                duration: 1.8,
                ease: 'expo.out',
                stagger: 0.06,
                delay: 1,
            });

            const descriptionSplit = new SplitText('.home__description', { type: 'lines' });

            gsap.from(descriptionSplit.lines, {
                opacity: 0,
                yPercent: 100,
                duration: 1.8,
                ease: 'expo.out',
                stagger: 0.06,
                delay: 1,
            });

            gsap.from('#home__contact-button', {
                opacity: 0,
                yPercent: 100,
                duration: 1.8,
                ease: 'expo.out',
                stagger: 0.06,
                delay: 1,
            });

            gsap.to('.home__scroll', {
                y: 5,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut'
            });
            
        }

        animate();
    });

    return (
        <section className="home section" id="home">
            <StyledHomeContainer className="home__container container grid">
                <div className="home__content grid">
                    <div className="home__social">
                        <a className="home__social-icon" href={SOCIAL_MEDIA.LINKEDIN.URL}
                            rel="noopener noreferrer" target="_blank" aria-label="Linkedin jhonsabastianas">
                            <i className={`${SOCIAL_MEDIA.LINKEDIN.ICON}`}></i>
                        </a>

                        <a className="home__social-icon" href={SOCIAL_MEDIA.YOUTUBE.URL}
                            rel="noopener noreferrer" target="_blank" aria-label="Medium jhonsabastianas">
                            <i className={`${SOCIAL_MEDIA.YOUTUBE.ICON}`}></i>
                        </a>

                        <a className="home__social-icon" href={SOCIAL_MEDIA.GITHUB.URL}
                            rel="noopener noreferrer" target="_blank" aria-label="Github jhonsabastianas">
                            <i className={`${SOCIAL_MEDIA.GITHUB.ICON}`}></i>
                        </a>
                    </div>

                    <div className="home__img">
                        <svg className="home__blob" viewBox="0 0 200 187" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                            <mask id="mask0" mask-type="alpha">
                                <path d="M190.312 36.4879C206.582 62.1187 201.309 102.826 182.328 134.186C163.346 165.547 
                                    130.807 187.559 100.226 186.353C69.6454 185.297 41.0228 161.023 21.7403 129.362C2.45775 
                                    97.8511 -7.48481 59.1033 6.67581 34.5279C20.9871 10.1032 59.7028 -0.149132 97.9666 
                                    0.00163737C136.23 0.303176 174.193 10.857 190.312 36.4879Z"
                                />
                            </mask>
                            <g mask="url(#mask0)">
                                <path d="M190.312 36.4879C206.582 62.1187 201.309 102.826 182.328 134.186C163.346 
                                    165.547 130.807 187.559 100.226 186.353C69.6454 185.297 41.0228 161.023 21.7403 
                                    129.362C2.45775 97.8511 -7.48481 59.1033 6.67581 34.5279C20.9871 10.1032 59.7028 
                                    -0.149132 97.9666 0.00163737C136.23 0.303176 174.193 10.857 190.312 36.4879Z"
                                />
                                <image className="home__blob-img" x='-27' y='-45' xlinkHref="/images/perfil_2.webp" />
                                {/* <image className="home__blob-img" xlinkHref="/images/FotoPersonal.jpg" /> */}
                            </g>
                        </svg>
                    </div>

                    <div className="home__data">
                        <h1 className="home__title">Hi, I'am Sebastian</h1>
                        <h2 className="home__subtitle">Software Architect</h2>
                        <p className="home__description">
                            Software architect and full stack software developer, with extensive knowledge in web and mobile applications, as well as trainer and content creator, producing quality work.
                        </p>
                        <Button id="home__contact-button" href="#contact">
                            Contact Me <i className="uil uil-message button__icon"></i>
                        </Button>
                    </div>

                    
                </div>
                <ScrollButton />
            </StyledHomeContainer>
        </section>
    )
}

export default Home