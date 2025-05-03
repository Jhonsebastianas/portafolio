import styled from "styled-components";
import Hero from "./sections/hero";
import ClavesSection from "./sections/claves-section";
import TargetAudienceSection from "./sections/target-audience";
import GiftRegistrationSection from "./sections/gift-registration-section";
import BottomBar from "@modules/funnels/components/bottom-bar";
import ModalSection from "./sections/modal-section";
import { ModalProvider } from "@modules/funnels/context/ModalContext";

// Estilos base
const Container = styled.div`
  font-family: "Arial", sans-serif;
  color: #333;
  background-color: #fff;
`;

const WorkAndStudyView = () => {

  return (
    <ModalProvider>
      <Container>
        <Hero />
        <ClavesSection />
        <TargetAudienceSection />
        <GiftRegistrationSection />
        <BottomBar
          textoIzquierda="ENCIENDE TU FUTURO - UN ESTUDIANTE BRILLANTE"
          textoCentro="EBOOK GRATUITO"
          textoBoton="LO QUIERO YA"
        />
        <ModalSection />
      </Container>
    </ModalProvider>
  );
};

export default WorkAndStudyView;
