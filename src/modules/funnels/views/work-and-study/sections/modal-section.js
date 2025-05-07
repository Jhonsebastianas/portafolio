import Input from "@modules/funnels/components/input";
import InputPhone from "@modules/funnels/components/input-phone";
import Modal from "@modules/funnels/components/modal";
import { useModal } from "@modules/funnels/context/ModalContext";
import { useState } from "react";
import styled from "styled-components";

const ModalSection = () => {
  const [phone, setPhone] = useState("");
  const { isOpen, closeModal } = useModal();

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <Content>
        <LeftSide>
          <Title>iDS</Title>
          <Subtitle>GUÍA PRÁCTICA GRATUITA</Subtitle>

          <StyledForm>
            <Input placeholder="Nombre" />
            <InputPhone
              country={"co"}
              value={phone}
              onChange={(phone) => setPhone(phone)}
            />
            <Input type="email" placeholder="Email" />

            <CheckboxContainer>
              <input type="checkbox" />
              He leído y{" "}
              <PrivacyLink href={"/politica-de-privacidad"} target="_blank">
                acepto la política de privacidad
              </PrivacyLink>
            </CheckboxContainer>

            <SubmitButton type="button">QUIERO MI EBOOK</SubmitButton>
          </StyledForm>

          <GiftBadge>🎁 GUÍA PRÁCTICA SOLO CON TU REGISTRO</GiftBadge>
          <Description>
            Llévate gratis nuestro PDF con el método para organizar tu vida
            profesional y estudiantil perfecta en menos de 5 minutos.
          </Description>
        </LeftSide>

        <RightSide>
          <Image src="/images/funnels/portada_web_image.png" alt="Mockup" />
        </RightSide>
      </Content>
    </Modal>
  );
};

export default ModalSection;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  width: 100%;
`;

const LeftSide = styled.div`
  flex: 1;
  min-width: 300px;
  text-align: center;
`;

const RightSide = styled.div`
  flex: 1;
  min-width: 300px;
  display: flex;
  align-items: center;
  justify-content: center; /* opcional si quieres que esté también centrado horizontalmente */
`;

const Title = styled.h2`
  color: white;
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: var(--first-color);
  font-weight: bold;
  margin-top: -0.5rem;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
`;

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.9rem;
`;

const PrivacyLink = styled.a`
  color: white;
  text-decoration: underline;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  background-color: var(--first-color);
  color: white;
  padding: 0.75rem;
  border-radius: 6px;
  border: none;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: var(--first-color-alt);
  }
`;

const GiftBadge = styled.div`
  margin-top: 1rem;
  border: 1px solid white;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
`;

const Description = styled.p`
  margin-top: 0.5rem;
  font-size: 0.9rem;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 12px;
`;
