"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import ButtonConfirmarAsistencia from "@modules/wedding/components/ButtonConfirmarAsistencia";

const InvitationCardWrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: center;

  .card {
    background: rgba(255, 255, 255, 0.9);
    padding: 2rem 1.5rem;
    margin: 1rem; /* NUEVO */
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    width: 100%; /* NUEVO */
    box-sizing: border-box; /* NUEVO */
    text-align: center;
    overflow-wrap: break-word; /* NUEVO */
    word-break: break-word; /* NUEVO */
  }

  .intro {
    font-size: 1rem;
    color: #444;
    margin-bottom: 1rem;
  }

  .our-wedding {
    font-family: "Great Vibes", cursive;
    font-size: 1.8rem;
    color: #b89d57;
    margin-bottom: 0.5rem;
  }

  .names {
    font-family: "Great Vibes", cursive;
    font-size: 2.5rem;
    color: #4a6fa5;
    margin-bottom: 1rem;
  }

  .note {
    font-size: 1rem;
    color: #444;
    margin-bottom: 2rem;
  }

  .date-time {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    padding: 1rem 0;
    margin-bottom: 2rem;

    .block {
      font-size: 0.9rem;
      color: #555;

      .label {
        font-weight: bold;
        font-size: 0.9rem;
        color: #4a6fa5;
      }

      .value {
        font-size: 2rem;
        color: #1f2e4d;
      }

      .sub {
        font-size: 0.7rem;
        color: #999;
      }
    }
  }

  .address {
    font-size: 1rem;
    margin-bottom: 1rem;
    color: #b89d57;
  }

  .confirm {
    font-size: 0.9rem;
    margin-bottom: 1rem;
    color: #b89d57;
  }

  .footer {
    font-family: "Great Vibes", cursive;
    font-size: 1.6rem;
    color: #b89d57;
    word-break: break-word;
    overflow-wrap: break-word;
  }

  .invitados {
    font-family: "Playfair Display", serif;
    font-size: 2rem;
    color: #b89d57;
    word-break: break-word;
    overflow-wrap: break-word;
  }

  .cantidad-invitados {
    font-size: 1.5rem;
  }
`;

export default function InvitationCard() {
  const router = useRouter();
  const searchParams = router.query;
  const cardRef = useRef();
  const [name, setName] = useState("");
  const [adults, setAdults] = useState(0);

  useEffect(() => {
    const nameParam = decodeURIComponent(
      searchParams.name || "invitado especial"
    );
    const adultsParam = decodeURIComponent(searchParams.adults || 0);
    setName(nameParam);
    setAdults(adultsParam);
  }, [searchParams]);

  function getTextoEnviar() {
    if (adults < 1) {
      return encodeURIComponent(
        `Hola Naty, confirmo mi asistencia a la boda, soy ${name}, muchas gracias por la invitación`
      );
    }
    return encodeURIComponent(
      `Hola Naty, confirmo mi asistencia a la boda, somos ${name}, confirmo que asistiremos los ${adults}, muchas gracias por la invitación`
    );
  }

  useEffect(() => {
    if (typeof window === "undefined") return;

    const initAnimations = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      gsap.to(cardRef.current, {
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      });
    };

    initAnimations();
  }, []);

  return (
    <InvitationCardWrapper>
      <div className="card" ref={cardRef}>
        <div className="note">
          Este día muy especial estaremos junto a nuestros seres queridos, por
          eso tenemos el gusto de invitarte.
          <br />
          <br />
          <div className="invitados">
            {(name && name) || "invitado especial"}
          </div>
          <br />
          <p className="cantidad-invitados">
            {(adults && adults > 0 && `Invitados: ${adults}`) || ""}
          </p>
        </div>

        <div className="date-time">
          <div className="block">
            <div className="label">SÁBADO</div>
          </div>
          <div className="block">
            <div className="value">28</div>
            <div className="sub">JUNIO</div>
          </div>
          <div className="block">
            <div className="label">2:00 PM</div>
          </div>
        </div>
        <ButtonConfirmarAsistencia />

        <div className="footer">¡Te esperamos!</div>
      </div>
    </InvitationCardWrapper>
  );
}
