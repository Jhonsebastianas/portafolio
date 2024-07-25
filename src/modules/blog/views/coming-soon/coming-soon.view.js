import Button from "@components/commons/button";
import BlogLayout from "@modules/blog/layouts/blog.layout";
import { useState } from "react";
import { Input } from "semantic-ui-react";
import styled from "styled-components";

const ComingSoonContainer = styled.div`
  margin-top: 3rem;

  .text-center {
    text-align: center;

    .color__primary {
      color: var(--first-color);
    }
  }

  span.color__red {
    color: red;
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

const ComingSoon = ({ campaign }) => {
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
    <BlogLayout>
      <ComingSoonContainer className="section container">
        {!emailSend &&
          <div className="max-w-md w-full space-y-6 ≈">
            <div className="text-center">
              <h1>Próximamente</h1>
              <p className="text-lg text-gray-500 dark:text-gray-400">
                Estamos trabajando duro para ofrecerte una nueva y emocionante sección de cursos, donde podrás crecer aún más como desarrollador y profesional.
              </p>
            </div>
            <div className="">
              <div className="relative">
                <form className="content__form" onSubmit={handleSubmit}>
                  <div className="contact__content">
                    <label htmlFor="subject" className="contact__label"><i className="uil uil-envelope"></i> {" "} Correo electrónico</label>
                    <input type="email" placeholder="Ingresa tu email" className="contact__input" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div className="suscribe__action-content">
                    <Button
                      type="submit"
                      className="suscribe_action-botton"
                      onClick={(event) => handleSubmit(event)}
                    >
                      Notificame
                    </Button>
                  </div>
                </form>
              </div>
              {message && <div className="text-center"><span className="color__red">{message}</span></div>}
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
          ||
          <div className="text-center">
            <div className="color__primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
              </svg>
              <h1 className="color__primary">Correo suscrito exitosamente</h1>
            </div>
            <p className="text-lg text-gray-500 dark:text-gray-400">
              Estamos muy contentos de contar contigo, te estaremos enviando información sobre las nuevas ofertas y emocionantes cursos, donde podrás crecer aún más como desarrollador y profesional.
            </p>
            <br />
            <div className="text-center">
              <span>
                Te avisaremos en cuanto esté disponible.
              </span>
            </div>
          </div>
        }
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
