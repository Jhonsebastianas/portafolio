// components/WeddingTimeline.js
import ButtonConfirmarAsistencia from "@modules/wedding/components/ButtonConfirmarAsistencia";
import ButtonIdeasVestimenta from "@modules/wedding/components/ButtonIdeasVestimenta";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const TimelineWrapper = styled.section`
  text-align: center;

  h2 {
    font-size: 6rem !important;
    margin-bottom: 2rem;
    font-family: "Playfair Display", serif;
    color: #5e4c58;
  }

  .cursive {
    font-family: "Luxurious Script", cursive;
  }

  .events {
    display: flex;
    flex-direction: column;
    gap: 3rem;

    @media (min-width: 768px) {
      flex-direction: row;
      justify-content: center;
      gap: 5rem;
    }
  }
`;

const EventCard = styled.div`
  max-width: 300px;
  margin: 0 auto;
  position: relative;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: #5e4c58;
  }

  .date {
    font-size: 1rem;
    color: #7a7a7a;
  }

  .image-container {
    position: relative;
    margin: 1rem 0;
    overflow: hidden;
    text-align: center;
  }

  .image-container img {
    width: 60%;
    justify-self: center;
    height: auto;
    display: block;
    margin: 0 auto;
  }

  .time {
    font-size: 1.5rem;
    margin-top: 1rem;
    letter-spacing: 2px;
    color: #b88672;
  }

  .location {
    font-size: 0.9rem;
    margin-top: 0.5rem;
    color: #7a7a7a;
  }
`;

const TemarioBoda = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const animate = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      gsap.utils.toArray(".temario").forEach((block) => {
        gsap.from(block, {
          y: 100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: block,
            start: "top 90%",
          },
        });
      });
    };

    animate();
  }, []);

  return (
    <TimelineWrapper ref={sectionRef}>
      <div className="events">
        <EventCard className="temario">
          <div className="image-container">
            <img src="/images/wedding/vestimenta.png" alt="Ceremony" />
          </div>
          <h3>Vestimenta de cóctel</h3>
          <p>Se reserva el color blanco para la novia</p>
          <ButtonIdeasVestimenta />
        </EventCard>
        <EventCard className="temario">
          <div className="image-container">
            <img src="/images/wedding/lluvia_sobres.png" alt="Brindis" />
          </div>
          <h3>Lluvia de sobres</h3>
        </EventCard>
        <EventCard className="temario">
          <div className="image-container">
            <img src="/images/wedding/confirmar_asistencia.png" alt="Brindis" />
          </div>
          <h3>Confirmar asistencia</h3>
          <p>Confirmar antes del 2 de junio</p>
          <ButtonConfirmarAsistencia />
        </EventCard>
      </div>
    </TimelineWrapper>
  );
};

export default TemarioBoda;
