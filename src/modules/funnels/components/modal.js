import React from "react";
import styled from "styled-components";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalContainer>
        <CloseButton onClick={onClose}>×</CloseButton>
        {children}
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContainer = styled.div`
  background: #111;
  color: white;
  border-radius: 16px;
  padding: 2rem;
  max-width: 850px;
  width: 100%;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  box-shadow: 0 0 0 2px var(--first-color);

  @media (max-width: 768px) {
    margin: 1rem;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1.25rem;
  font-size: 1.5rem;
  color: white;
  background: transparent;
  border: none;
  cursor: pointer;
`;
