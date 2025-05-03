import React from "react";
import styled from "styled-components";
import { useModal } from "@modules/funnels/context/ModalContext";

const GiftRegistrationSection = () => {
  const { openModal } = useModal();
  return (
    <Wrapper>
      <Card>
        <Header>🎁 REGALO SOLO POR REGISTRARTE 🎁</Header>
        <Content>
          <TextContent>
            <SubTitle>GUÍA PRÁCTICA</SubTitle>
            <Title>
              Organiza tu vida universitaria perfecta en{" "}
              <strong>menos de 15 minutos.</strong>
            </Title>
            <Paragraph>
              Al registrarte ahora, recibirás un PDF con el método que usamos
              para planificar la semana ideal, equilibrando estudio, trabajo y
              vida personal sin estrés.
            </Paragraph>
            <Button onClick={openModal}>QUIERO LA GUÍA</Button>
          </TextContent>
          <ImageContent>
            <img
              src="/images/funnels/tablet-ebook-trabajar.png"
              alt="Guía PDF en tablet y celular"
            />
          </ImageContent>
        </Content>
      </Card>
    </Wrapper>
  );
};

export default GiftRegistrationSection;

// Styled Components

const Wrapper = styled.section`
  padding: 4rem 2rem;
  background: linear-gradient(to bottom right, #000, #0a0a0a);
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    margin-bottom: 4rem;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 16px;
  max-width: 800px;
  width: 100%;
  overflow: hidden;
`;

const Header = styled.div`
  background-color: var(--first-color);
  color: white;
  font-weight: 600;
  text-align: center;
  padding: 0.75rem;
  font-size: 1rem;
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 2rem;
  gap: 2rem;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const TextContent = styled.div`
  flex: 1;
  min-width: 280px;
  text-align: center;
`;

const SubTitle = styled.p`
  color: var(--first-color);
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;

  strong {
    font-weight: 800;
  }
`;

const Paragraph = styled.p`
  color: #333;
  margin-bottom: 1.5rem;
`;

const Button = styled.button`
  background-color: var(--first-color);
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: var(--first-color-alt);
  }
`;

const ImageContent = styled.div`
  flex: 1;
  min-width: 250px;

  img {
    width: 100%;
    max-width: 340px;
    display: block;
    margin: 0 auto;
  }
`;
