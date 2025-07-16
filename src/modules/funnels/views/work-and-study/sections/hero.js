import styled from "styled-components";

import "react-phone-input-2/lib/style.css";
import Input from "@modules/funnels/components/input";
import { useState } from "react";
import InputPhone from "@modules/funnels/components/input-phone";
import Link from "next/link";
import { useRouter } from "next/router";

const HeroContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4rem;
  padding: 4rem 2rem;
  background: url("/images/funnels/miniaturas.png") center/cover no-repeat;
  color: white;
  position: relative;
  min-height: 90vh;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1;
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  max-width: 600px;
`;

const Logo = styled.h2`
  font-weight: bold;
  font-size: 2rem;
  color: #fff;
  span {
    color: var(--first-color);
  }
`;

const Subtitle = styled.p`
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.9rem;
  margin: 1rem 0;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  margin: 1rem 0;
  color: #fff;
  span {
    color: var(--first-color);
    font-weight: bold;
  }
`;

const Date = styled.p`
  margin-top: 1rem;
  font-size: 1rem;
  letter-spacing: 1px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;

const InputRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const CheckboxRow = styled.label`
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  color: #ccc;
  a {
    color: white;
    text-decoration: underline;
    margin-left: 0.3rem;
  }
`;

const SubmitButton = styled.button`
  background-color: var(--first-color);
  color: white;
  padding: 1rem;
  border: none;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: var(--first-color-alt);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  z-index: 2;
  max-width: 400px;

  img {
    width: 100%;
    border-radius: 20px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Hero = () => {
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    console.log(nombre, email, phone, isChecked);
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
        setNombre("");
        setEmail("");
        setPhone("");
        setIsChecked(false);
        router.push("/funnel/email-confirmation");
      } else {
        alert("Error al registrarte: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error inesperado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <HeroContainer>
      <Overlay />
      <Content>
        <Logo>i<span>DS.</span></Logo>
        <Subtitle>ebook gratuito</Subtitle>
        <Title>
          <span>Estudia y trabaja</span> <br />
          Aprende a ser un estudiante exitoso que trabaja, con 7 hábitos poderosos.
        </Title>

        <Form>
          <InputRow>
            <Input
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <InputPhone
              placeholder="311 325 4040"
              country={"co"}
              value={phone}
              onChange={(phone) => setPhone(phone)}
            />
          </InputRow>

          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <CheckboxRow>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              required
            />
            He leído y{" "}
            <Link href="/politica-de-privacidad" target="_blank">
              acepto la política de privacidad
            </Link>
          </CheckboxRow>

          <SubmitButton type="button" onClick={handleSubmit} disabled={loading}>
            {loading ? "Enviando..." : "QUIERO MI EBOOK"}
          </SubmitButton>
        </Form>
      </Content>

      <ImageWrapper>
        <img src="/images/funnels/hero.png" alt="Presentador" />
      </ImageWrapper>
    </HeroContainer>
  );
};

export default Hero;
