import React, { useRef, useState } from "react";
import styled from "styled-components";

const CardGradiant = ({ children, className }) => {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: -1000, y: -1000 });

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });
  };

  const handleMouseLeave = () => {
    setCoords({ x: -1000, y: -1000 }); // oculta el gradiente cuando sale
  };

  return (
    <Wrapper
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        "--x": `${coords.x}px`,
        "--y": `${coords.y}px`,
      }}
    >
      <InnerCard>{children}</InnerCard>
    </Wrapper>
  );
};

export default CardGradiant;

const Wrapper = styled.div`
  border-radius: 15px;
  padding: 2px;
  background-image: radial-gradient(
    300px circle at var(--x) var(--y),
    var(--first-color) 0,
    transparent 100%
  );
  transition: background 0.3s ease;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.15);
    transform: translateY(-4px);
  }
`;

const InnerCard = styled.div`
  border-radius: 13px;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(38, 38, 38, 0.5),
    rgba(10, 10, 10, 0.5)
  );
  background-color: rgba(10, 10, 10, 0.8);
  padding: 2rem;
  color: white;
  position: relative;
  z-index: 1;
`;
