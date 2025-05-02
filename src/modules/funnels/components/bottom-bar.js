import React from "react";
import styled from "styled-components";

const BottomBar = ({ textoIzquierda, textoCentro, textoBoton, onClick }) => {
  return (
    <Bar>
      <Contenido>
        <TextosIzquierda>
          <Texto>{textoIzquierda}</Texto>
        </TextosIzquierda>
        <TextosDerecha>
          <TextoCentro>{textoCentro}</TextoCentro>
          <Boton onClick={onClick}>{textoBoton}</Boton>
        </TextosDerecha>
      </Contenido>
    </Bar>
  );
};

export default BottomBar;

// Styled Components

const Bar = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: var(--first-color);
  color: white;
  padding: 0.36rem 1rem;
  z-index: 999;

  @media (max-width: 768px) {
    padding: 0rem 1rem;
  }
`;

const Contenido = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
`;

const TextosIzquierda = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const TextosDerecha = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const Texto = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 0.75rem;
    white-space: normal;
  }
`;

const TextoCentro = styled(Texto)`
  text-align: right;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const Boton = styled.button`
  background-color: #1a1a1a;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: white;
    color: black;
  }

  @media (max-width: 768px) {
    font-size: 0.75rem;
    white-space: normal;
    padding: 0.5rem 1.5rem;
    margin-bottom: 0.5rem;
  }
`;
