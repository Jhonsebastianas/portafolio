// components/WeddingTimeline.js
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

const WeddingTimeline = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const animate = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      gsap.utils.toArray(".event").forEach((block) => {
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
      <h2 className="animate cursive">Cronograma</h2>
      <div className="events">
        <EventCard className="event">
          <div className="image-container">
            <img src="/images/wedding/ceremony.png" alt="Ceremony" />
          </div>
          <h3>La Ceremonia</h3>
          <div className="date">Junio 28, 2025</div>

          <div className="time">2:00 PM</div>
          <div className="location">Parroquia Santa Lucia</div>
        </EventCard>
        <EventCard className="event">
          <div className="image-container">
            <img src="/images/wedding/brindis.png" alt="Brindis" />
          </div>
          <h3>El Brindis</h3>
          <div className="date">Junio 28, 2025</div>
          <div className="time">3:00 PM</div>
          <div className="location">Parroquia Santa Lucia</div>
        </EventCard>
      </div>
    </TimelineWrapper>
  );
};

export default WeddingTimeline;
