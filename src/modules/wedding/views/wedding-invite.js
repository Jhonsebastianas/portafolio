import React, { useEffect, useRef, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import "lenis/dist/lenis.css";
import InvitationCard from "./sections/invitation-card";
import LoveStory from "./sections/LoveStory";
import WeddingTimeline from "./sections/WeddingTimeline";
import SoundToggle from "../components/SoundToggle";

const GlobalStyle = createGlobalStyle`

  html, body {
    margin: 0;
    padding: 0;
    scroll-behavior: auto; /* evitar conflicto con Lenis */
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    font-smooth: always;
    -webkit-font-smoothing: antialiased;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    font-family: 'Playfair Display', serif;
    background-color: #fef6f9;
    color: #fff;
  }

  .cursive {
    font-family: "Updock", cursive;
  }

  .shimmer {
    position: relative;
    display: inline-block;
    //font-weight: bold;
    color: transparent;
    background-image: linear-gradient(
      120deg,
      transparent 0%,
      transparent 40%,
      rgba(255, 255, 255, 0.7) 50%,
      transparent 60%,
      transparent 100%
    );
    background-size: 200% auto;
    background-position: -100% center;
    background-repeat: no-repeat;
    -webkit-background-clip: text;
    -webkit-text-fill-color: #fff; /* Hace el texto blanco */
    animation: shimmer-text 4s infinite;
  }

  @keyframes shimmer-text {
    0% {
      background-position: -100% center;
    }
    100% {
      background-position: 200% center;
    }
  }

  // CONTADOR

  @keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}

@keyframes shimmer {
  0% {
    background-position: -150% center;
  }
  100% {
    background-position: 150% center;
  }
}

.shimmer-text {
  background: linear-gradient(
    120deg,
    #ffffff 0%,
    #d4af37 100%, /* dorado */
    #ffffff 100%
  );
  background-size: 150% auto;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  animation: shimmer 5s infinite;
}


`;

export const CeremonyInfo = styled.p`
  font-family: "Great Vibes", cursive;
  font-size: clamp(1.9rem, 4vw, 2.5rem);
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  margin-bottom: 1rem;
  margin-top: 1.5rem;
  letter-spacing: 0.5px;
  text-shadow: 0 1px 4px rgba(255, 255, 255, 0.25);

  background: linear-gradient(to right, #f5e3b3, #ffffff);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
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
    padding: 8rem 2rem 2rem 2rem;
  }
`;

const HeroContent = styled.div`
  max-width: 600px;
  z-index: 2;
  padding: 0 1rem; /* Asegura algo de padding lateral */

  h1 {
    font-size: clamp(2.5rem, 10vw, 10rem); /* Adaptativo */
    text-align: center;
    font-weight: 500;
    margin-bottom: 1rem;
    color: #fff;
    text-shadow: 0 0 8px rgba(255, 250, 250, 0.8);
    word-break: break-word;
    line-height: .8;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: clamp(7rem, 8vw, 5rem); /* Opcional: más suave en tablets */
    }
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
  const textRef = useRef(null);

  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const initAnimationAndCountdown = async () => {
      // Cargar las librerías de forma dinámica
      const Lenis = (await import("@studio-freight/lenis")).default;
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      // Inicializar Lenis
      const lenis = new Lenis({
        smooth: true,
        lerp: 0.08,
        smoothTouch: false,
      });
      const raf = (time) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);

      // Animación de elementos con clase "animate" al hacer scroll
      gsap.utils.toArray(".animate").forEach((el) => {
        gsap.from(el, {
          y: 80,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        });
      });

      gsap.to(".shimmer", {
        y: -4,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.from(textRef.current, {
        opacity: 0,
        y: -30,
        duration: 1.5,
        ease: "power3.out",
        delay: 0.5,
      });

      // Función para el contador de cuenta regresiva
      const interval = setInterval(() => {
        const eventDate = new Date("2025-06-28T00:00:00");
        const now = new Date();
        const diff = eventDate - now;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        setCountdown({ days, hours, minutes, seconds });
      }, 1000);

      // Limpiar al desmontar el componente
      return () => {
        lenis.destroy();
        clearInterval(interval);
      };
    };

    initAnimationAndCountdown();
  }, []);

  return (
    <>
      <SoundToggle />
      <GlobalStyle />
      <Container ref={containerRef}>
        <Hero>
          <HeroContent className="animate">
            <h1 className="cursive">
              <span className="shimmer">Sebastian & Natalia</span>
            </h1>
            <div ref={textRef}>
              <CeremonyInfo>
                "Por sobre todas las cosas, vístanse de amor, que es el vínculo
                perfecto." — Colosenses 3:14
              </CeremonyInfo>
            </div>

            {/* <RSVPButton>Confirmar asistencia</RSVPButton> */}
          </HeroContent>
          <HeroImage
            className="animate"
            src="/images/wedding/hero_our.png"
            alt="Pareja"
          />
        </Hero>

        <Section alt>
          <LoveStory />
        </Section>
        <Section>
          <WeddingTimeline />
        </Section>
        <Section alt>
          <h2 className="animate">Estas invitado 💍</h2>
          <InvitationCard />
        </Section>
        {/* <FancyCountdown>
          <div className="unit">
            <span className="number shimmer-text">{countdown.days}</span>
            <span className="label">Días</span>
          </div>
          <div className="unit">
            <span className="number shimmer-text">{countdown.hours}</span>
            <span className="label">Horas</span>
          </div>
          <div className="unit">
            <span className="number shimmer-text">{countdown.minutes}</span>
            <span className="label">Minutos</span>
          </div>
          <div className="unit">
            <span className="number shimmer-text">{countdown.seconds}</span>
            <span className="label">Segundos</span>
          </div>
        </FancyCountdown>
        <div ref={textRef}>
          <CeremonyInfo>28 de junio de 2025</CeremonyInfo>
        </div> */}

        {/* <Section>
          <h2 className="animate">Momentos especiales ✨</h2>
          <Gallery>
            <Image src="/img/photo1.jpg" alt="Foto 1" />
            <Image src="/img/photo2.jpg" alt="Foto 2" />
            <Image src="/img/photo3.jpg" alt="Foto 3" />
          </Gallery>
        </Section> */}

        <Section>
          <h2 className="animate">Ubicación 📍</h2>
          <p className="animate">
            La ceremonia tendrá lugar en la hermosa Parroquia María Madre de
            Dios, de Rionegro ¡Te esperamos para celebrar juntos!
          </p>
          <MapEmbed
            className="animate"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1809.291104120588!2d-75.45135551239612!3d6.1763465117139615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e469dc47dd516bd%3A0x9718733a0431c90c!2sParroquia%20Mar%C3%ADa%20Madre%20de%20Dios!5e0!3m2!1ses!2sco!4v1747373606981!5m2!1ses!2sco"
            allowFullScreen=""
            loading="lazy"
          ></MapEmbed>
        </Section>
      </Container>
    </>
  );
};

export default WeddingInvite;
