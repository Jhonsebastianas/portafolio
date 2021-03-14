import React from 'react'
import Persona from '@constants/DatosPersona'
import StylesComponent from 'styled-components'
import { Button, Header } from 'semantic-ui-react';

const StyleContactoContainer = StylesComponent.section`
    padding: 5rem 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const StyleContactoResumen = StylesComponent.h3`
    max-width: 800px;
    text-align: center;
`;

const StyleContactoButton = StylesComponent.a`
    border-style: solid;
    border-width: 1px;
    border-radius: 5px;
    border-color: var(--green);

    color: var(--green);

    margin-top: 30px;
    margin-bottom: 190px;

    padding: 20px;

    &:hover,
    &:focus {
        background-color: rgba(255,255,255,0.1);
        color: var(--green)
    }
`;

const Contact = () => {
    return (
        <StyleContactoContainer id="Contact">
            <Header as='h2' icon textAlign='center' className="text-white">
                <Header.Content>Contacto</Header.Content>
            </Header>
            <StyleContactoResumen className="funciones text-light-slate">
                Aunque actualmente no estoy buscando nuevas oportunidades laborales,
                mi bandeja de entrada siempre está abierta.
                Ya sea que tengas una pregunta, requieras una mentoria o simplemente quieras saludar,
                ¡haré todo lo posible para responderle!
            </StyleContactoResumen>
            <StyleContactoButton rel="noopener noreferrer" href="mailto:jhonsebastianas@gmail.com">Contactar</StyleContactoButton>
        </StyleContactoContainer>
    )
}

export default Contact