import BlogLayout from "@modules/blog/layouts/blog.layout"
import styled from "styled-components"
import moment from 'moment/moment';
import Link from "next/link";

const StyledSocialContainer = styled.div`
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

const StyledSocialIcon = styled.a`
    margin: 1.5rem;
`

const StyledAboutContainer = styled.div`

    .about__data {

        span {
            font-size: var(--h3-font-size);
        }

        h1 {
            font-size: var(--h1-font-size);
        }
    }

    .about__img {
        width: 100px;
        border-radius: .5rem;
        justify-self: center;
        align-self: center;
    }

    .about__description {
        text-align: left;
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

const StyleAboutInfo = styled.div`
    display: flex;
    margin-top: 2rem;
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
`

const StylePost = styled.div`
    padding: 2rem;
    background-color: var(--input-color);

    h2 {
        margin-bottom: .5rem;
    }

    p {
        a {
            margin-bottom: 1rem;
        }
    }
`

const About = () => {

    const workStartDate = new Date(2019, 1, 1);
    const yearsWorked = moment().diff(workStartDate, "years");

    return (
        <section className="about section" id="about">
            
            <StyledAboutContainer className="about__container container grid">
                <div className="about__data">
                    <span>Desarrollador de software senior</span>
                    <h1>Sebastian Agudelo</h1>

                    <p className="about__description">
                        Desarrollador de software backend y frontend, con conocimientos de desarrollo en IoT, produciendo trabajos de calidad.
                        <br></br>
                        <br></br>
                        «No hay emoción más intensa para un inventor que ver funcionar una de sus creaciones...». - Nikola Tesla
                        <br></br>
                        <br></br>
                        Poder influir positivamente en la vida de las personas gracias a la tecnología es una de las cosas que más me gustan de mi trabajo y que más me entusiasman.
                    </p>



                    <div className="about__buttons">
                        <StyledSocialContainer>
                            <StyledSocialIcon className="social__link" href="https://www.linkedin.com/in/jhonsabastianas/" rel="noopener noreferrer" target="_blank">
                                <i className="uil uil-linkedin-alt social__icon"></i>
                            </StyledSocialIcon>
                            <StyledSocialIcon className="social__link" href="https://github.com/jhonsebastianas" rel="noopener noreferrer" target="_blank">
                                <i className="uil uil-github-alt social__icon"></i>
                            </StyledSocialIcon>
                        </StyledSocialContainer>
                    </div>
                </div>
                <img src="../images/about_2.webp" alt="sebastian_img" className="about__img" />
            </StyledAboutContainer>
            <StylePost className="container">
                <h2>Post populares</h2>
                <p>
                    <a>Un vistazo al futuro: el internet de las cosas (IOT) en el 2021 para “consumidores inteligentes”</a>
                    <br />
                    <br />
                    <Link href={"/blog/articles/snippets-en-javaScript-optimiza-tus-tareas-repetitivas-en-vscode"}>
                        <a>Snippets en JavaScript: optimiza tus tareas repetitivas en VSCode.</a>
                    </Link>
                </p>
            </StylePost>
        </section>
    )
}

const AboutBlogView = () => {
    return (
        <BlogLayout>
            <About />
        </BlogLayout>
    )
}

export default AboutBlogView