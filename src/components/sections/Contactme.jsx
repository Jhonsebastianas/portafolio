import React from 'react'
import StyledComponent from 'styled-components'

const StyledContactContainer = StyledComponent.div`
    row-gap: 3rem;

    .contact__information {
        display: flex;
        margin-bottom: var(--mb-2);
    }

    .contact__icon {
        font-size: 2rem;
        color: var(--first-color);
        margin-right: var(--mb-0-75);
    }

    .contact__title {
        font-size: var(--h3-font-size);
        font-weight: var(--font-medium);
    }

    .contact__subtitle {
        font-size: var(--small-font-size);
        color: var(--text-color-light);
    }

    .contact__content {
        background-color: var(--input-color);
        border-radius: .5rem;
        padding: .75rem 1rem .25rem;
    }

    .contact__label {
        font-size: var(--smaller-font-size);
        color: var(--title-color);
    }

    .contact__input {
        width: 100%;
        background-color: var(--input-color);
        color: var(--text-color);
        font-family: var(--body-font);
        font-size: var(--normal-font-size);
        border: none;
        outline: none;
        padding: .25rem .5rem .5rem 0;
    }
`

const Contacme = () => {
    return (
        <section className="contact section" id="contact">
            <h2 className="section__title">Contact Me</h2>
            <span className="section__subtitle">Get in touch</span>

            <StyledContactContainer className="contact__container container grid">
                <div>
                    <div className="contact__information">
                        <i className="uil uil-phone contact__icon"></i>

                        <div>
                            <h3 className="contact__title">Call Me</h3>
                            <span className="contact__subtitle">311-326-4747</span>
                        </div>
                    </div>

                    <div className="contact__information">
                        <i className="uil uil-envelope contact__icon"></i>

                        <div>
                            <h3 className="contact__title">Email</h3>
                            <span className="contact__subtitle">jhonsebastianas@gmail.com</span>
                        </div>
                    </div>

                    <div className="contact__information">
                        <i className="uil uil-map-marker contact__icon"></i>

                        <div>
                            <h3 className="contact__title">Location</h3>
                            <span className="contact__subtitle">Colombia - Medellín</span>
                        </div>
                    </div>
                </div>

                <form action="" className="contact__form grid">
                    <div className="contact__inputs grid">
                        <div className="contact__content">
                            <label htmlFor="" className="contact__label">Name</label>
                            <input type="text" className="contact__input" />
                        </div>
                        <div className="contact__content">
                            <label htmlFor="" className="contact__label">Email</label>
                            <input type="email" className="contact__input" />
                        </div>
                    </div>
                    <div className="contact__content">
                        <label htmlFor="" className="contact__label">Project</label>
                        <input type="text" className="contact__input" />
                    </div>
                    <div className="contact__content">
                        <label htmlFor="" className="contact__label">Message</label>
                        <textarea name="" id="" cols="0" rows="7" className="contact__input"></textarea>
                    </div>

                    <div>
                        <a href="#" className="button button--flex">
                            Send Message
                        <i className="uil uil-message button__icon"></i>
                        </a>
                    </div>
                </form>
            </StyledContactContainer>
        </section>
    )
}

export default Contacme