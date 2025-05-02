import styled from "styled-components";
import HeroWS from "./sections/hero-ws";
import ClavesSection from "./sections/claves-section";
import TargetAudienceSection from "./sections/target-audience";
import GiftRegistrationSection from "./sections/gift-registration-section";
import BottomBar from "@modules/funnels/components/bottom-bar";

// Estilos base
const Container = styled.div`
  font-family: "Arial", sans-serif;
  color: #333;
  background-color: #fff;
`;

const Section = styled.section`
  padding: 4rem 2rem;
  text-align: center;
`;

const Hero = styled(Section)`
  background: linear-gradient(to right, #ff9472, #f2709c);
  color: white;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
`;

const CTAButton = styled.a`
  display: inline-block;
  margin-top: 2rem;
  padding: 1rem 2rem;
  background-color: white;
  color: #f2709c;
  font-weight: bold;
  text-decoration: none;
  border-radius: 8px;
  transition: 0.3s;

  &:hover {
    background-color: #ffe6f0;
  }
`;

const BenefitList = styled.ul`
  max-width: 800px;
  margin: 0 auto;
  list-style: none;
  padding: 0;
`;

const Benefit = styled.li`
  font-size: 1.1rem;
  margin: 1rem 0;
`;

const Testimonial = styled.blockquote`
  font-style: italic;
  margin: 2rem auto;
  max-width: 600px;
`;

const FooterCTA = styled(Section)`
  background-color: #f2709c;
  color: white;
`;

const WorkAndStudyView = () => {

  const register = () => {
    console.log("melo")
  }

  return (
    <Container>
      <HeroWS />
      <ClavesSection />
      <TargetAudienceSection />
      <GiftRegistrationSection />
      <BottomBar
        textoIzquierda="ENCIENDE TU FUTURO - UN ESTUDIANTE BRILLANTE"
        textoCentro="EBOOK GRATUITO"
        textoBoton="LO QUIERO YA"
        onClick={register}
      />
      {/* <Section>
        <Title>¿Qué vas a conseguir?</Title>
        <BenefitList>
          <Benefit>✔️ Claridad en tu mensaje</Benefit>
          <Benefit>✔️ Estrategia de contenido</Benefit>
          <Benefit>✔️ Confianza para mostrarte</Benefit>
        </BenefitList>
      </Section>

      <Section>
        <Title>Sobre la creadora</Title>
        <Subtitle>Hola, soy Marta, especialista en marca personal...</Subtitle>
      </Section>

      <Section>
        <Title>Testimonios</Title>
        <Testimonial>
          "Gracias a este entrenamiento, lancé mi proyecto con claridad. ¡Muy
          recomendado!"
          <br />– Ana G.
        </Testimonial>
      </Section>

      <FooterCTA id="registro">
        <Title>¿Lista para comenzar?</Title>
        <CTAButton href="https://tuenlace.com">Acceder ahora</CTAButton>
      </FooterCTA>*/}
    </Container>
  );
};

export default WorkAndStudyView;
