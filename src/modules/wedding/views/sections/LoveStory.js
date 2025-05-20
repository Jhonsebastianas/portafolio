import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const StorySection = styled.section`
  color: #5e2c45;
  text-align: center;
  overflow: hidden;

  h2 {
    font-size: 6rem !important;
    margin-bottom: 3rem;
    color: #9d7d1e;
  }

  .cursive {
    //font-family: "Updock", serif;
    font-family: "Luxurious Script", cursive;
  }

  .h2-with-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    flex-wrap: nowrap;
    margin-bottom: 3rem;

    h2 {
      font-size: 6rem !important;
      margin: 0;
    }

    .h2-icon {
      height: 100px;
      object-fit: contain;
      margin-top: 0.2em;
    }

    @media (max-width: 768px) {
      h2 {
        font-size: 3.5rem !important;
      }

      .h2-icon {
        height: 70px;
      }
    }
  }
`;

const StoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  max-width: 1000px;
  margin: 0 auto;

  @media (min-width: 768px) {
    gap: 5rem;
  }
`;

const StoryBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;

  @media (min-width: 768px) {
    flex-direction: ${({ reverse }) => (reverse ? "row-reverse" : "row")};
    align-items: flex-start;
    text-align: left;
  }
`;

const StoryImage = styled.img`
  width: 100%;
  max-width: 400px;
  border-radius: 20px;
  margin-bottom: 1rem;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    margin-bottom: 0;
    margin-right: ${({ reverse }) => (reverse ? "0" : "2rem")};
    margin-left: ${({ reverse }) => (reverse ? "2rem" : "0")};
  }
`;

const StoryContent = styled.div`
  max-width: 500px;

  h3 {
    font-size: 2rem;
    color: #9d7d1e;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.7;
    color: #5e4c58;
  }
`;

const LoveStory = () => {
  const sectionRef = useRef();

  useEffect(() => {
    const animate = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      gsap.utils.toArray(".story-block").forEach((block) => {
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
    <StorySection ref={sectionRef}>
      <div className="h2-with-icon">
        <h2 className="animate cursive">Nuestra Historia</h2>
        <img
          src="/images/wedding/items/rosario.png"
          alt="Icono"
          className="animate h2-icon"
        />
      </div>
      <StoryContainer>
        <StoryBlock className="story-block">
          <StoryImage
            src="/images/wedding/first_meeting.png"
            alt="Primer Encuentro"
          />
          <StoryContent>
            <h3>Primer Encuentro</h3>
            <p>
              Dios tenía preparado nuestro encuentro en su casa, la sagrada
              familia, nos conocimos en el grupo universitario, una muchacha
              liderando el grupo, y un chico que llegaba nuevo al barrio, fueron
              dos los encuentros que pasaron, hasta que en una actividad…
              ocurrió una mirada, una de esas miradas que cuando se chocan en el
              momento preciso… le dan sentido a todo, fue el clic que inició
              nuestra historia de dos.
            </p>
          </StoryContent>
        </StoryBlock>

        <StoryBlock className="story-block" reverse>
          <StoryImage
            src="/images/wedding/first_date.JPG"
            alt="Primera Cita"
            reverse
          />
          <StoryContent>
            <h3>Primera Cita</h3>
            <p>
              Acordamos encontrarnos a las 3 p.m. en la Ruana para tomar un café
              conversar y conocernos, ella estaba radiante ese día, sus ojos
              brillaban y cada peca de su cuerpo adornaba perfectamente su piel,
              él estaba muy guapo, y con una sonrisa encantadora; luego de
              hablar y sentir la conexión más especial, nos dimos nuestro primer
              beso 🙈, 4 horas pasaron, y se sintieron como 5 minutos, una
              primera cita espectacular.
            </p>
          </StoryContent>
        </StoryBlock>

        {/* <StoryBlock className="story-block">
          <StoryImage src="/images/wedding/proposal.jpg" alt="La Propuesta" />
          <StoryContent>
            <h3>La Propuesta</h3>
            <p>
              Con el corazón latiendo fuerte y las estrellas como testigos,
              dijimos sí al amor eterno. Fue mágico, un sueño hecho realidad.
            </p>
          </StoryContent>
        </StoryBlock> */}

        <StoryBlock className="story-block">
          <StoryImage
            src="/images/wedding/wedding_day.png"
            alt="Día de la Boda"
          />
          <StoryContent>
            <h3>El Gran Día</h3>
            <p>
              El 28 de junio será el día en que nuestras almas se unan para
              siempre, delante de Dios, quien fue el autor de nuestro amor. Y
              queremos que seas parte de este momento tan especial en nuestras
              vidas.
            </p>
          </StoryContent>
        </StoryBlock>
      </StoryContainer>
    </StorySection>
  );
};

export default LoveStory;
