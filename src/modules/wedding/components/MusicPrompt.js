// components/MusicPrompt.js
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Prompt = styled.div`
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  background: rgba(255, 240, 245, 0.9);
  padding: 10px 20px;
  border-radius: 20px;
  font-family: "Cursive", sans-serif;
  font-size: 0.8rem;
  color: black;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: opacity 0.3s ease;
  transform: translate(-50%, -50%);
`;

const MusicPrompt = () => {
  const [position, setPosition] = useState({ x: -9999, y: -9999 });
  const [visible, setVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsMobile(isTouch);

    if (!isTouch && visible) {
      const move = (e) => {
        setPosition({ x: e.clientX, y: e.clientY - 15 });
      };
      window.addEventListener("mousemove", move);
      return () => window.removeEventListener("mousemove", move);
    } else {
      // Si es móvil, centro el texto
      setPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      onClick={() => setVisible(false)}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        cursor: "pointer",
        zIndex: 9998,
      }}
    >
      <Prompt style={{ top: position.y, left: position.x }}>
        [DAR CLIC EN CUALQUIER LUGAR - PARA HABILITAR LA MÚSICA]
      </Prompt>
    </div>
  );
};

export default MusicPrompt;
