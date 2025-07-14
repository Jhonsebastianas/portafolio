import Input from "@modules/funnels/components/input";
import InputPhone from "@modules/funnels/components/input-phone";
import Modal from "@modules/funnels/components/modal";
import { useModal } from "@modules/funnels/context/ModalContext";
import { useState } from "react";
import styled from "styled-components";

const ModalSection = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const { isOpen, closeModal } = useModal();

  const handleSubmit = async () => {
    if (!nombre || !email || !phone || !isChecked) {
      alert("Por favor completa todos los campos y acepta la política.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/register-funnel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          nombre,
          telefono: phone,
          campaign: "7-habitos-para-estudiar-y-trabajar-ebook"
        })
      });

      const data = await res.json();
      if (res.ok) {
        alert("¡Registro exitoso! Revisa tu correo.");
        setNombre("");
        setEmail("");
        setPhone("");
        setIsChecked(false);
        closeModal();
      } else {
        alert("Error al registrar: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error al enviar el formulario.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <Content>
        <LeftSide>
          <Title>iDS</Title>
          <Subtitle>GUÍA PRÁCTICA GRATUITA</Subtitle>

          <StyledForm>
            <Input
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />

            <InputPhone
              country={"co"}
              value={phone}
              onChange={(value) => setPhone(value)}
              placeholder="311 325 4040"
            />

            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <CheckboxContainer>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
              He leído y{" "}
              <PrivacyLink href={"/politica-de-privacidad"} target="_blank">
                acepto la política de privacidad
              </PrivacyLink>
            </CheckboxContainer>

            <SubmitButton type="button" onClick={handleSubmit} disabled={loading}>
              {loading ? "Enviando..." : "QUIERO MI EBOOK"}
            </SubmitButton>
          </StyledForm>

          <GiftBadge>🎁 GUÍA PRÁCTICA SOLO CON TU REGISTRO</GiftBadge>
          <Description>
            Llévate gratis nuestro PDF con el método para organizar tu vida profesional y estudiantil perfecta en menos de 5 minutos.
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
