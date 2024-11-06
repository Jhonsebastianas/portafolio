import Link from 'next/link'
import React from 'react'
import { SOCIAL_MEDIA } from 'src/util/constants'
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
                        <h1 className="footer__title">Sebastian Agudelo</h1>
                        <span className="footer__subtitle">Software Architect | Senior Fullstack developer </span>
                    </div>

                    <div className="footer__socials">
                        <a target="_blank" className="footer__social"href={SOCIAL_MEDIA.YOUTUBE.URL}
                            rel="noopener noreferrer" aria-label="Youtube jhonsabastianas">
                            <i className={`${SOCIAL_MEDIA.YOUTUBE.ICON}`}></i>
                        </a>
                        
                        <a target="_blank" className="footer__social"href={SOCIAL_MEDIA.LINKEDIN.URL}
                            rel="noopener noreferrer" aria-label="Youtube jhonsabastianas">
                            <i className={`${SOCIAL_MEDIA.LINKEDIN.ICON}`}></i>
                        </a>
                        <a target="_blank" className="footer__social"href={SOCIAL_MEDIA.INSTAGRAM.URL}
                            rel="noopener noreferrer" aria-label="Youtube jhonsabastianas">
                            <i className={`${SOCIAL_MEDIA.INSTAGRAM.ICON}`}></i>
                        </a>
                        <a target="_blank" className="footer__social"href={SOCIAL_MEDIA.PERSONAL_BLOG.URL}
                            rel="noopener noreferrer" aria-label="Youtube jhonsabastianas">
                            <i className={`${SOCIAL_MEDIA.PERSONAL_BLOG.ICON}`}></i> Blog 
                        </a>
                    </div>
                </div>

                <p className="footer__copy">Hecho con ❤️ por Sebastian Agudelo</p>
            </div>
        </StyledFooter>
    )
}

export default Footer