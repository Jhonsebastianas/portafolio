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
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const unlockAudio = () => {
      if (!isUnlocked && audioRef.current) {
        const audio = audioRef.current;
        audio.volume = 0.5;

        audio
          .play()
          .then(() => {
            setIsPlaying(true);
            setIsUnlocked(true);
          })
          .catch((err) => {
            console.warn("Bloqueado por autoplay. Esperando interacción.", err);
          });
      }
    };

    // Solo activa al primer clic o tecla
    const handleFirstInteraction = () => {
      unlockAudio();
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("keydown", handleFirstInteraction);
    };

    document.addEventListener("click", handleFirstInteraction);
    document.addEventListener("keydown", handleFirstInteraction);

    return () => {
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("keydown", handleFirstInteraction);
    };
  }, [isUnlocked]);

  const toggleSound = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((err) => {
        console.warn("Error al reproducir:", err);
      });
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <Wrapper onClick={toggleSound} isPlaying={isPlaying}>
      SOUND <span className="dot" /> {isPlaying ? "ON" : "OFF"}
      <audio ref={audioRef} loop src="/audio/music_page.webm" preload="auto" />
    </Wrapper>
  );
};

export default SoundToggle;
