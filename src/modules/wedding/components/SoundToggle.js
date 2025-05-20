// components/SoundToggle.js
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  top: 20px;
  left: 20px;
  font-family: monospace;
  color: black;
  z-index: 1000;
  cursor: pointer;
  user-select: none;

  span.dot {
    display: inline-block;
    width: 6px;
    height: 6px;
    background: black;
    border-radius: 50%;
    margin: 0 6px;
    box-shadow: ${({ isPlaying }) =>
      isPlaying ? "0 0 8px 4px rgba(0,0,0,0.4)" : "none"};
  }
`;

const SoundToggle = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Autoplay al cargar la página
    const audio = audioRef.current;
    const playAudio = () => {
      if (audio) {
        audio.volume = 0.5;
        audio.play().catch((err) => {
          console.warn("Autoplay bloqueado, el usuario debe interactuar.");
        });
      }
    };
    playAudio();
  }, []);

  const toggleSound = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <Wrapper onClick={toggleSound} isPlaying={isPlaying}>
      SOUND <span className="dot" /> {isPlaying ? "ON" : "OFF"}
      <audio ref={audioRef} loop src="/audio/music_page.webm" />
    </Wrapper>
  );
};

export default SoundToggle;
