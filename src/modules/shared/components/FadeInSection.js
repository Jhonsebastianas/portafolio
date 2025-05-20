// components/FadeInSection.jsx
import { useEffect, useRef } from "react";
import styled from "styled-components";

const Section = styled.section`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
`;

export default function FadeInSection() {
  const ref = useRef();

  useEffect(() => {
    const animate = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      gsap.to(ref.current, {
        opacity: 1,
        duration: 1.2,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    };

    animate();
  }, []);

  return <Section ref={ref}>✨ Fade In ✨</Section>;
}
