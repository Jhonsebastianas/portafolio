// components/WeddingTimeline.js
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const TimelineWrapper = styled.section`
  text-align: center;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    font-family: "Playfair Display", serif;
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
  }

  .date {
    font-size: 1rem;
    color: #7a7a7a;
  }

  .image-container {
    position: relative;
    margin: 1rem 0;
    border-radius: 50%;
    overflow: hidden;
    border: 6px solid #fff;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  }

  .image-container img {
    width: 100%;
    height: auto;
    display: block;
  }

  .time {
    font-size: 1rem;
    margin-top: 1rem;
    letter-spacing: 2px;
    color: #b88672;
  }

  .location {
    font-size: 0.9rem;
    margin-top: 0.5rem;
    color: #333;
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
      <h2 className="animate">Cronograma ⏱️</h2>
      <div className="events">
        <EventCard className="event">
          <h3>La Ceremonia</h3>
          <div className="date">June 28, 2025</div>
          <div className="image-container">
            <img src="/images/wedding/ceremony.png" alt="Ceremony" />
          </div>
          <div className="time">3:00 PM</div>
          <div className="location">Parroquia Santa Lucia</div>
        </EventCard>
        <EventCard className="event">
          <h3>El Brindis</h3>
          <div className="date">June 28, 2025</div>
          <div className="image-container">
            <img src="/images/wedding/brindis.png" alt="Brindis" />
          </div>
          <div className="time">5:00 PM</div>
          <div className="location">Parroquia Santa Lucia</div>
        </EventCard>
      </div>
    </TimelineWrapper>
  );
};

export default WeddingTimeline;
