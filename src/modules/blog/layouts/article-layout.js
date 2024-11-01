import styled from "styled-components";
import SuscribeLayout from "./suscribe-layout";

const StyleContainer = styled.section`

    .portada {
        .portada__title {
            margin-bottom: 1.5rem;
            
            .portada__time {
                display: flex;
                justify-content: space-between;
            }
        }

        img {

        }
    }

    h2 {
        margin-top: 2rem;
    }
    
    h3 {
        margin-top: 1.25rem;
    }

    p {
        margin-top: 1rem;
    }

    .img__container {
        text-align: center;
        margin-bottom: 1rem;
        //aspect-ratio: 16 / 9; /* Mantiene el espacio reservado */

        img {
            width: 100%;
            padding-top: 2rem;
            padding-left: 2rem;
            padding-right: 2rem;
            //aspect-ratio: 16 / 9; /* Esto reserva el espacio de la imagen */
        }

        span {
            font-size: var(--small-font-size);
        }
    }

    ol, ul {
        margin-top: 1rem;
        padding-left: 1.5rem;
        padding-righy: 1.5rem;
    }

    ul {
        li {
            margin-top: 1rem;
        }
    }

    .container__comentario {
        border-left: .25rem solid var(--first-color);
        padding-left: .5rem;
    }

    .code__container {
        margin-bottom: 1rem;
        display: grid;

        span {
            text-align: center;
            font-size: var(--small-font-size);
        }
    }
`

const ArticleLayout = ({ children }) => {
    return (<StyleContainer className="section">
        <div className="container grid">
            {children}
            <br />
            <br />
            <hr />
            <SuscribeLayout />
        </div>
    </StyleContainer>)
}

export default ArticleLayout;