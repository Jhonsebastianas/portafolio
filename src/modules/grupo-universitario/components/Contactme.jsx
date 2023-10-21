import React, { useState } from 'react'
import StyledComponent from 'styled-components'

const StyledContainer = StyledComponent.div`
    @media(max-width: 991px) {
        margin-top: 3rem;
    }
`;

const StyledContactContainer = StyledComponent.div`
    row-gap: 3rem;

    .contact__information {
        display: flex;
        margin-bottom: var(--mb-2);
    }

    .contact__icon {
        font-size: 2rem;
        color: #2C4899;
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

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')

    const [urlComplete, setUrlComplete] = useState('mailto:jhonsebastianas@gmail.com')

    const handledSendMail = () => {
        const concatCharacter = ['?', '&'];
        const index = 0;
        let url = 'mailto:jhonsebastianas@gmail.com'
        if (email) {
            url += `${concatCharacter[index]}cc=${email}`;
            index = 1;
        }
        if (name || subject) {
            url += `${concatCharacter[index]}subject=${[name, subject].join(' - ').replace(' ', '%20')}`;
            index = 1;
        }
        if (message) {
            url += `${concatCharacter[index]}body=${message.replace(' ', '%20')}`
        }

        setUrlComplete(url)
    }

    const handledEmail = (event) => {
        const { target } = event
        const { value, name } = target
        if (name == 'names') setName(value)
        if (name == 'email') setEmail(value)
        if (name == 'subject') setSubject(value)
        if (name == 'message') setMessage(value)

        handledSendMail()
    }

    return (
        <StyledContainer className="contact section" id="contact">
            <h2 className="section__title">Contacto</h2>
            <StyledContactContainer className="contact__container container grid">
                <div>
                    <div className="contact__information">
                        <i className="uil uil-phone contact__icon"></i>

                        <div>
                            <h3 className="contact__title">Celular: Hender Seminarista</h3>
                            <span className="contact__subtitle">+57 3177383697</span>
                        </div>
                    </div>

                    <div className="contact__information">
                        <i className="uil uil-map-marker contact__icon"></i>

                        <div>
                            <h3 className="contact__title">Location</h3>
                            <span className="contact__subtitle">Colombia - Medellín, Parroquia La Sagrada Familia Villa Hermosa</span>
                        </div>
                    </div>
                </div>
                {/* <form action="" className="contact__form grid">
                    <div className="contact__inputs grid">
                        <div className="contact__content">
                            <label htmlFor="names" className="contact__label">Nombres</label>
                            <input type="text" name="names" id="names" className="contact__input" onChange={handledEmail} />
                        </div>
                        <div className="contact__content">
                            <label htmlFor="email" className="contact__label">Correo</label>
                            <input type="email" name="email" id="email" className="contact__input" onChange={handledEmail} />
                        </div>
                    </div>
                    <div className="contact__content">
                        <label htmlFor="subject" className="contact__label">Interés</label>
                        <input type="text" name="subject" id="subject" className="contact__input" onChange={handledEmail} />
                    </div>
                    <div className="contact__content">
                        <label htmlFor="message" className="contact__label">Mensaje</label>
                        <textarea name="message" id="message" cols="0" rows="7" className="contact__input" onChange={handledEmail} ></textarea>
                    </div>

                    <div>
                        <a href={urlComplete} className="button button--flex" onClick={handledEmail}>
                            Send Message
                            <i className="uil uil-message button__icon"></i>
                        </a>
                    </div>
                </form> */}
            </StyledContactContainer>
        </StyledContainer>
    )
}

export default Contacme