import React, { useEffect, useRef } from "react";
import styled, { createGlobalStyle } from "styled-components";
import 'lenis/dist/lenis.css'
import gsap from "gsap";
import Lenis from "@studio-freight/lenis";
import HeroZoomScroll from "./sections/hero";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Playfair Display', serif;
    background-color: #fef6f9;
    color: #fff;
    overflow-x: hidden;
  }
`;

const Container = styled.div`
  background: radial-gradient(circle at top, #fddde6 0%, #fae1e9 100%);
`;

const Hero = styled.section`
  height: 100vh;
  background-image: url("/images/wedding/hero_background.png"); /* Cambia esto por el fondo natural */
  background-size: cover;
  background-position: center left;
  display: flex;
  align-items: center;
  padding: 4rem 8%;
  color: #fff;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    justify-content: center;
    padding: 2rem;
  }
`;

const HeroContent = styled.div`
  max-width: 600px;
  z-index: 2;

  h1 {
    font-size: 4rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: #fff;
  }

  h3 {
    font-size: 1.5rem;
    color: #ffe6ef;
    margin-bottom: 2rem;
  }
`;

const HeroImage = styled.img`
  position: absolute;
  right: 5%;
  bottom: 0;
  height: 90%;
  max-height: 700px;
  object-fit: contain;
  pointer-events: none;

  @media (max-width: 768px) {
    position: static;
    height: auto;
    width: 100%;
    margin-top: 2rem;
  }
`;

const Names = styled.h1`
  font-size: 4.5rem;
  margin: 0;
  color: #fff;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
`;

const WeddingDate = styled.h3`
  font-size: 1.8rem;
  margin-top: 1rem;
  color: #ffe6ef;
`;

const RSVPButton = styled.button`
  margin-top: 2rem;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border: none;
  border-radius: 50px;
  background-color: #f090b7;
  color: white;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;

  &:hover {
    background-color: #d36d9c;
    transform: scale(1.05);
  }
`;

const Section = styled.section`
  padding: 6rem 2rem;
  text-align: center;
  background-color: ${({ alt }) => (alt ? "#ffffff" : "#fef6f9")};
  color: ${({ alt }) => (alt ? "#333" : "#8c5c73")};
  position: relative;
  overflow: hidden;

  h2 {
    font-size: 3rem;
    margin-bottom: 1.5rem;
  }

  p {
    max-width: 800px;
    margin: 0 auto;
    font-size: 1.25rem;
    line-height: 1.8;
  }
`;

const StoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  flex-wrap: wrap;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const StoryImage = styled.img`
  width: 100%;
  max-width: 500px;
  border-radius: 20px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
`;

const StoryText = styled.div`
  max-width: 600px;
  text-align: left;

  h3 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #8c5c73;
  }

  p {
    font-size: 1.1rem;
    color: #5e4c58;
    line-height: 1.7;
  }
`;

const Countdown = styled.div`
  font-size: 1.5rem;
  margin-top: 2rem;
`;

const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 3rem;
`;

const Image = styled.img`
  width: 100%;
  height: 350px;
  object-fit: cover;
  border-radius: 15px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
`;

const MapEmbed = styled.iframe`
  width: 100%;
  max-width: 800px;
  height: 400px;
  border: none;
  border-radius: 15px;
  margin-top: 2rem;
`;

const WeddingInvite = () => {
  const containerRef = useRef(null);
  const countdownRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis();
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    gsap.from(".animate", {
      y: 80,
      opacity: 0,
      duration: 1.2,
      stagger: 0.3,
      ease: "power3.out",
    });

    const interval = setInterval(() => {
      const eventDate = new Date("2025-06-28T00:00:00");
      const now = new Date();
      const diff = eventDate - now;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      if (countdownRef.current) {
        countdownRef.current.textContent = `Faltan ${days} días, ${hours}h ${minutes}m ${seconds}s`;
      }
    }, 1000);

    return () => {
      lenis.destroy();
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <GlobalStyle />
      <Container ref={containerRef}>
        
        <Hero>
          <HeroContent className="animate">
            <h3>28 de Junio - Iglesia Rionegro</h3>
            <h1>Natalia & Jhon</h1>
            <Countdown ref={countdownRef} />
            {/* <RSVPButton>Confirmar asistencia</RSVPButton> */}
          </HeroContent>
          <HeroImage className="animate" src="/images/wedding/hero_our.png" alt="Pareja" />
        </Hero>
        <HeroZoomScroll />

        <Section alt>
          <h2 className="animate">Nuestra Historia de Amor 💖</h2>
          <StoryWrapper>
            <StoryImage src="/images/wedding/our_history.JPG" alt="Nuestra Historia" />
            <StoryText>
              <h3>Un camino juntos</h3>
              <p>
                Desde la primera mirada hasta este momento mágico, nuestra
                historia ha estado llena de aventuras, sueños compartidos y amor
                profundo. El 28 de junio será un nuevo capítulo de nuestro
                cuento de hadas, y queremos compartirlo contigo.
              </p>
              <p>
                Gracias por acompañarnos en este viaje. Cada paso ha sido más
                hermoso porque tú has estado ahí.
              </p>
            </StoryText>
          </StoryWrapper>
        </Section>

        <Section>
          <h2 className="animate">Momentos especiales ✨</h2>
          <Gallery>
            <Image src="/img/photo1.jpg" alt="Foto 1" />
            <Image src="/img/photo2.jpg" alt="Foto 2" />
            <Image src="/img/photo3.jpg" alt="Foto 3" />
          </Gallery>
        </Section>

        <Section alt>
          <h2 className="animate">Ubicación 📍</h2>
          <p className="animate">
            La ceremonia tendrá lugar en la hermosa Iglesia de Rionegro. ¡Te
            esperamos para celebrar juntos!
          </p>
          <MapEmbed
            className="animate"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.8416474421326!2d-75.37913068523753!3d6.154898527710334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e4682f3b78f015d%3A0xf31d64e2f6f56345!2sIglesia%20San%20Nicol%C3%A1s%20de%20Rionegro!5e0!3m2!1ses-419!2sco!4v1622055435390!5m2!1ses-419!2sco"
            allowFullScreen=""
            loading="lazy"
          ></MapEmbed>
        </Section>
      </Container>
    </>
  );
};

export default WeddingInvite;
