// components/ScaleOnScroll.jsx
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

// 🎨 Estilos del contenedor, imagen y texto animado
const Section = styled.section`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Image = styled.img`
  width: 400px;
  height: auto;
  transform-origin: center center;
  border-radius: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  z-index: 1;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const Phrase = styled.div`
  position: absolute;
  top: 40px;
  text-align: center;
  font-family: 'Parisienne', cursive;
  font-size: 3rem;
  color: #6c3c6b;
  z-index: 2;
  white-space: pre-line;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    top: 20px;
    padding: 0 1rem;
  }
`;

export default function ScaleOnScroll() {
  const imageRef = useRef();
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "Contigo, para siempre...";

  useEffect(() => {
    let gsap, ScrollTrigger;
    let interval;

    const runAnimation = () => {
      let index = 0;
      let currentText = "";

      interval = setInterval(() => {
        currentText += fullText.charAt(index);
        setDisplayedText(currentText);
        index++;

        if (index === fullText.length) clearInterval(interval);
      }, 60);
    };

    const setupAnimations = async () => {
      ({ gsap } = await import("gsap"));
      ({ ScrollTrigger } = await import("gsap/ScrollTrigger"));
      gsap.registerPlugin(ScrollTrigger);

      // Escalado imagen
      gsap.fromTo(
        imageRef.current,
        { scale: 1 },
        {
          scale: 2,
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
            end: "top 40%",
            scrub: true,
          },
          ease: "power2.out",
          duration: 1,
        }
      );

      // Animación de texto cuando está en viewport
      ScrollTrigger.create({
        trigger: imageRef.current,
        start: "top 80%",
        onEnter: () => {
          // Solo iniciar la máquina de escribir si no ha empezado ya
          if (!interval) runAnimation();
        },
        once: true, // Que solo pase una vez
      });
    };

    setupAnimations();

    return () => {
      if (interval) clearInterval(interval);
      ScrollTrigger && ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <Section>
      <Phrase>{displayedText}</Phrase>
      <Image
        ref={imageRef}
        src="/images/wedding/amor.jpg"
        alt="Flor que escala con el scroll"
      />
    </Section>
  );
}