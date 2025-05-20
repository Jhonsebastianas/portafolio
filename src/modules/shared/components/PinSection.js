// components/PinSection.jsx
import { useEffect, useRef } from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 200vh;
  background: #fff8dc;
`;

const FixedSection = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  background: #ffd6d6;
`;

export default function PinSection() {
  const pinRef = useRef();

  useEffect(() => {
    const animate = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ScrollTrigger.create({
        trigger: pinRef.current,
        start: "top top",
        end: "+=100%",
        pin: true,
        pinSpacing: true,
      });
    };

    animate();
  }, []);

  return (
    <Container>
      <FixedSection ref={pinRef}>
        📌 Esta sección se queda fija un momento
      </FixedSection>
    </Container>
  );
}
