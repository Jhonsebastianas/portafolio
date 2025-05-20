// components/ScaleOnScroll.jsx
import { useEffect, useRef } from "react";
import styled from "styled-components";

// 🎨 Estilos del contenedor y la imagen
const Section = styled.section`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fdf6f9;
`;

const Image = styled.img`
  width: 300px;
  height: auto;
  transform-origin: center center;
`;

export default function ScaleOnScroll() {
  const imageRef = useRef();

  useEffect(() => {
    const animate = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      /**
       * Escalamos la imagen del 80% al 100% mientras haces scroll
       * scrub: true sincroniza la animación con el scroll
       */
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
    };

    animate();
  }, []);

  return (
    <Section>
      <Image
        ref={imageRef}
        src="/images/wedding/first_date.JPG"
        alt="Flor que escala con el scroll"
      />
    </Section>
  );
}
