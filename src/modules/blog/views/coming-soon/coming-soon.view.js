import Button from "@components/commons/button";
import BlogLayout from "@modules/blog/layouts/blog.layout";
import { Input } from "semantic-ui-react";
import styled from "styled-components";

const ComingSoonContainer = styled.div`

    margin-top: 3rem;

    .text-center {
        text-align: center;
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
`;

const ComingSoon = () => {
    return (
        <BlogLayout>
            <ComingSoonContainer className="section container">
                <div className="max-w-md w-full space-y-6 ≈">
                    <div className="text-center">
                        <h1>Próximamente</h1>
                        <p className="text-lg text-gray-500 dark:text-gray-400">
                            Estamos trabajando duro para ofrecerte una nueva y emocionante sección de cursos, donde podrás crecer aún más como desarrollador y profesional.
                        </p>
                    </div>
                    <div className="">
                        <div className="relative">
                            <form className="content__form">
                                <div className="contact__content">
                                    <label htmlFor="subject" className="contact__label"><i class="uil uil-envelope"></i> {" "} Correo electrónico</label>
                                    <input type="text" name="email" id="email" className="contact__input" />
                                </div>
                                <div className="suscribe__action-content">
                                    <Button
                                        type="submit"
                                        className="suscribe_action-botton"
                                    >
                                        Notificame
                                    </Button>
                                </div>
                            </form>
                        </div>
                        <div className="text-center">
                            <span>
                                Te avisaremos en cuanto esté disponible.
                            </span> 
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="h-1 w-16 bg-blue-500 rounded-full animate-pulse" />
                    </div>
                </div>
            </ComingSoonContainer>
        </BlogLayout>
    )
}

function MailIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
    )
}


export default ComingSoon;