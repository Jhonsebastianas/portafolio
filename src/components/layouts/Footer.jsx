import React from 'react'
import StyledComponent from 'styled-components'

const StyledFooter = StyledComponent.footer`
    padding-top: 2rem;

    .footer__container {
        row-gap: 3.5rem;
    }

    .footer__bg {
        background-color: var(--first-color-second);
        padding: 2rem 0 3rem;
    }

    .footer__title {
        font-size: var(--h1-font-size);
        margin-bottom: var(--mb-0-25);
    }

    .footer__subtitle {
        font-size: var(--small-font-size);
    }

    .footer__links {
        display: flex;
        flex-direction: column;
        row-gap: 1.5rem;
    }

    .footer__link {
        &:hover {
            color: var(--first-color-lighter);
        }
    }

    .footer__social {
        font-size: 1.25rem;
        margin-right: var(--mb-1-5);

        &:hover {
            color: var(--first-color-lighter);
        }
    }

    .footer__copy {
        font-size: var(--smaller-font-size);
        text-align: center;
        color: var(--text-color-light);
        margin-top: var(--mb-3);
    }

    .footer__title, 
    .footer__subtitle,
    .footer__link,
    .footer__social {
        color: #FFF;
    }
`

const Footer = () => {
    return (
        <StyledFooter className="footer">
            <div className="footer__bg">
                <div className="footer__container container grid">
                    <div>
                        <h1 className="footer__title">Sebastian</h1>
                        <span className="footer__subtitle">Analyst developer</span>
                    </div>

                    <ul className="footer__links">
                        <li>
                            <a href="#services" className="footer__link">Services</a>
                        </li>
                        <li>
                            <a href="#portfolio" className="footer__link">Portfolio</a>
                        </li>
                        <li>
                            <a href="#contact" className="footer__link">Contactme</a>
                        </li>
                    </ul>

                    <div className="footer__socials">
                        <a target="_blank" className="footer__social" href="https://www.facebook.com/jhonsebastianas"
                            rel="noopener noreferrer">
                            <i className="uil uil-facebook-f"></i>
                        </a>
                        <a target="_blank" className="footer__social" href="https://www.instagram.com/jhonsebastianas/"
                            rel="noopener noreferrer">
                            <i className="uil uil-instagram"></i>
                        </a>
                        <a target="_blank" className="footer__social" href="https://twitter.com/JhonSebastianAS"
                            rel="noopener noreferrer">
                            <i className="uil uil-twitter-alt"></i>
                        </a>
                    </div>
                </div>

                <p className="footer__copy">&#169; Jhonsebastianas. All right reserved</p>
            </div>
        </StyledFooter>
    )
}

export default Footer