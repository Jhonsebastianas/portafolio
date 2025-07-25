// components/SlideInFromLeft.jsx
import { useEffect, useRef } from "react";
import styled from "styled-components";

const Box = styled.div`
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 5vw;
`;

const Element = styled.div`
  background: #d1e0ff;
  padding: 2rem;
  border-radius: 10px;
  opacity: 0;
  transform: translateX(-100px);
`;

export default function SlideInFromLeft() {
  const ref = useRef();

  useEffect(() => {
    const animate = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      gsap.to(ref.current, {
        x: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
        },
      });
    };

    animate();
  }, []);

  return (
    <Box>
      <Element ref={ref}>➡️ Slide desde la izquierda</Element>
    </Box>
  );
}
