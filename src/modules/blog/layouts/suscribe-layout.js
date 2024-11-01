import Button from "@components/commons/button";
import styled from "styled-components";

import { useState } from "react";

const Container = styled.section`
.contact__content {
    margin-bottom: 1rem;
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

.email__send {
    text-align: center;

    .color__primary {
        color: var(--first-color);
    }

    span.color__red {
        color: red;
    }
}

.content__container {
    background-color: var(--body-color);

    .content__textos {
        text-align: center;
        margin-bottom: 1rem;
    }

    .content__form {
        margin-top: 1rem;
        display: flex;
        justify-content: center;

        .suscribe__action-content {
            text-align: center;
            margin-left: .25rem;

            .suscribe_action-botton {
                height: 82%;
                align-content: center;
                // margin: .75rem 1rem .25rem;
            }
        }

        @media screen and (max-width: 700px) {
            flex-direction: column;
        }
    }

    .contact__content {
        
    }
}
`;

const SuscribeLayout = ({ campaign }) => {

    const [email, setEmail] = useState('');
    const [emailSend, setEmailSend] = useState(false);
    const [promotions, setPromotions] = useState(true);
    const [courses, setCourses] = useState(true);
    const [message, setMessage] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setMessage('Ingrese una dirección de correo valida');
            return;
        }
        setMessage("");

        const res = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                preferences: {
                    promotions,
                    courses,
                },
                campaigns: [campaign],
            }),
        });

        const data = await res.json();

        if (res.ok) {
            setEmailSend(true);
            setMessage('Email registered/updated successfully');
        } else {
            setEmailSend(false);
            setMessage(data.message || 'Something went wrong');
        }
    };

    return (
        <Container>
            <div className="content__container container">
                {!emailSend &&
                    <div className="mx-auto max-w-2xl text-center">
                        <div className="content__textos">
                            <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-gray-100">
                                Conviértete en un desarrollador senior y mantente actualizado
                            </h2>
                            <p className="mb-8 text-gray-600 dark:text-gray-400">
                                Nuestro blog te brindará consejos y estrategias para mejorar tus habilidades técnicas, avanzar en tu carrera
                                y mantenerte al día con las últimas tendencias en tecnología.
                            </p>
                        </div>
                        <form className="content__form" onSubmit={handleSubmit}>
                            <div className="contact__content">
                                <label htmlFor="subject" className="contact__label">Correo electrónico</label>
                                <input type="email" placeholder="Ingresa tu email" className="contact__input" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="suscribe__action-content">
                                <Button
                                    type="submit"
                                    className="suscribe_action-botton"
                                    onClick={(event) => handleSubmit(event)}
                                >
                                    Suscribirse
                                </Button>
                            </div>
                        </form>
                        {message && <div className="email__send"><span className="color__red">{message}</span></div>}
                    </div>
                    ||
                    <div className="email__send">
                        <div className="color__primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                            </svg>
                            <h1 className="color__primary">Suscrito al newsletter exitosamente</h1>
                        </div>
                        <p className="text-lg text-gray-500 dark:text-gray-400">
                            Te mantendremos actualizado y brindaremos consejos para que sigas avanzando en tu carrera como desarrollador de software y profesional.
                        </p>
                    </div>
                }
            </div>
        </Container>
    )
}


export default SuscribeLayout;