// pages/confirmacion.js
import { useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background-color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  font-family: 'Arial', sans-serif;

  @media (min-width: 768px) {
    flex-direction: row;
    text-align: left;
  }
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: white;
  margin-bottom: 1rem;
  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
  }
`;

const Text = styled.p`
  font-size: 1.1rem;
  color: #ccc;
  max-width: 600px;
  margin-bottom: 1.5rem;
  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
  }
`;

const YoutubeButton = styled.a`
  background-color: var(--first-color);
  color: white;
  padding: 0.8rem 1.6rem;
  border-radius: 8px;
  font-weight: bold;
  text-decoration: none;
  transition: background 0.3s;

  &:hover {
    background-color: var(--first-color-alt);
  }
`;

const Image = styled.img`
  max-width: 500px;
  height: auto;
  margin-top: 2rem;
  border-radius: 12px;

  @media (min-width: 768px) {
    margin-top: 0;
    max-width: 500px;
  }
`;

export default function EmailConfirmationView() {
  useEffect(() => {
    const animate = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      gsap.from("h1", { opacity: 0, y: -30, duration: 1 });
      gsap.from("p", { opacity: 0, y: 20, duration: 1, delay: 0.3 });
      gsap.from("a", { opacity: 0, scale: 0.9, duration: 0.8, delay: 0.6 });
    };

    animate();
  }, []);

  return (
    <Container>
      <Left>
        <Image src="/images/funnels/portada_web_image.png" alt="Ebook enviado" />
      </Left>
      <Right>
        <Title>¡Revisa tu correo!</Title>
        <Text>
          Te hemos enviado la guía gratuita directamente a tu bandeja de entrada. Si no la ves, revisa la carpeta de spam o promociones, puede ser que tu plataforma de email no este acostumbrada a tanto valor.
          <br /><br />
          Recuerda aplicar los hábitos desde hoy y comparte esta oportunidad con alguien más. También te invito a visitar mi canal de YouTube donde comparto más contenido exclusivo.
        </Text>

        <YoutubeButton href="https://www.youtube.com/@jhonsebastianas" target="_blank" rel="noopener noreferrer">
          Ir al canal de YouTube
        </YoutubeButton>
      </Right>
    </Container>
  );
}
