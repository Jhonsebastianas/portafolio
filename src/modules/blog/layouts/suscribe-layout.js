import Button from "@components/commons/button";
import styled from "styled-components";

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

.content__container {
    background-color: var(--body-color);

    .content__textos {
        text-align: center;
        margin-bottom: 1rem;
        margin-left: 1rem;
        margin-right: 1rem;
    }

    .content__form {
        margin: 1rem;
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
    }

    .contact__content {
        
    }
}
`;

const SuscribeLayout = () => {
    return (
        <Container>
            <div className="content__container container">
                <div className="mx-auto max-w-2xl text-center">
                    <div className="content__textos">
                        {/* <div className="content__suscribe">
                            Suscríbete a nuestro blog
                        </div> */}
                        <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-gray-100">
                            Conviértete en un desarrollador senior y mantente actualizado
                        </h2>
                        <p className="mb-8 text-gray-600 dark:text-gray-400">
                            Nuestro blog te brindará consejos y estrategias para mejorar tus habilidades técnicas, avanzar en tu carrera
                            y mantenerte al día con las últimas tendencias en tecnología.
                        </p>
                    </div>
                    <form className="content__form">
                        <div className="contact__content">
                            <label htmlFor="subject" className="contact__label">Correo electrónico</label>
                            <input type="text" name="email" id="email" className="contact__input" />
                        </div>
                        <div className="suscribe__action-content">
                            <Button
                                type="submit"
                                className="suscribe_action-botton"
                            >
                                Suscribirse
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Container>
    )
}


export default SuscribeLayout;