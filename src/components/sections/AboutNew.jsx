import React from 'react';
import StyledComponents from 'styled-components';
import Button from '@components/commons/button';
import moment from 'moment/moment';

const StyledAboutContainer = StyledComponents.div`
    .about__img {
        width: 200px;
        border-radius: .5rem;
        justify-self: center;
        align-self: center;
    }

    .about__description {
        text-align: center;
        margin-bottom: var(--mb-2-5);
    }

    .about__info {
        display: flex;
        justify-content: space-evenly;
        margin-bottom: var(--mb-2-5); 

        .about__info-title {
            font-size: var(--h2-font-size);
            font-weight: var(--font-semi-bold);
            color: var(--title-color);
        }

        .about__info-name {
            font-size: var(--smaller-font-size);
        }

        .about__info-title,
        .about__info-name {
            display: block;
            text-align: center;
        }
    }

    .about__buttons {
        display: flex;
        justify-content: center;
    }
`;

const About = () => {

    const workStartDate = new Date(2019, 2, 14);
    const yearsWorked = moment().diff(workStartDate, "years");

    return (
        <section className="about section" id="about">
            <h2 className="section__title">About Me</h2>
            <span className="section__subtitle">My introduction</span>
            <StyledAboutContainer className="about__container container grid">
                <img src="images/about.webp" alt="sebastian_img" className="about__img" />
                <div className="about__data">
                    <p className="about__description">
                        "There is no more intense emotion for an inventor than to see one of his creations work..." - Nikola Tesla
                        <br></br>
                        Being able to impact people's lives in a positive way with technology is one of the things that I enjoy the most about my work, and the ones that excite me the most.
                    </p>

                    <div className="about__info">
                        <div>
                            <span className="about__info-title">{yearsWorked}+</span>
                            <span className="about__info-name">Years <br></br> experience</span>
                        </div>

                        <div>
                            <span className="about__info-title">06+</span>
                            <span className="about__info-name">Completed <br></br> project</span>
                        </div>

                        <div>
                            <span className="about__info-title">02+</span>
                            <span className="about__info-name">Companies <br></br> worked</span>
                        </div>
                    </div>

                    <div className="about__buttons">
                        <Button target="_blank" href="pdf/CV-SebastianAgudelo-English.pdf">
                            Download CV <i className="uil uil-download-alt button__icon"></i>
                        </Button>
                    </div>
                </div>
            </StyledAboutContainer>
        </section>
    )
}

export default About