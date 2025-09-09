// components/HeroSection.js
import styled from "styled-components";
import HeroLogo from "@modules/portfolio/components/HeroLogo";
import HeroPhoto from "@modules/portfolio/components/HeroPhoto";
import { useGSAP } from "@gsap/react";
import moment from "moment/moment";
import { useMediaQuery } from "react-responsive";
import { useRef } from "react";

const HeroWrapper = styled.section`
  @supports (aspect-ratio: 1) {
    body {
      --framer-aspect-ratio-supported: auto;
    }
  }
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 100vh;
  background: #f2f2f2;
  overflow: hidden;
  padding: 0 2rem;
  padding-bottom: 6rem;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: flex-end;
    background: #f2f2f2;
    padding-bottom: 4rem;
  }
`;

const HeroContent = styled.div`
  text-align: center;
  z-index: 2;
  max-width: 900px;
  margin-bottom: 8rem;

  @media (max-width: 768px) {
    text-align: left;
    max-width: 100%;
    margin-bottom: 2rem;
  }
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 700;
  color: var(--first-color);
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: clamp(2.5rem, 8vw, 4rem);
    margin-bottom: 1rem;
    line-height: 1.1;
  }
`;

const SubInfo = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  font-size: 1rem;
  color: var(--first-color);
  margin-top: 1rem;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  span {
    font-weight: bold;
    font-size: 1.2rem;
  }

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    font-size: 0.9rem;
    margin-top: 2rem;

    div {
      align-items: flex-start;
    }

    span {
      font-size: 1.5rem;
      margin-bottom: 0.25rem;
    }

    p {
      font-size: 0.8rem;
      opacity: 0.9;
    }
  }
`;

// 👉 Overlay oscuro solo para móvil
const DarkOverlay = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000000;
    //background: linear-gradient(180deg, #14141400 30%, #141414 60%);
    background: linear-gradient(180deg, #14141400 40%, #141414 70%);
    z-index: 1;
  }
`;

const AboutWrapper = styled.section`
  p {
    color: #888;
  }

  @media (max-width: 767.98px) {
    p {
      color: #999;
    }
  }
`;

export default function HeroSection() {
  const heroRef = useRef(null);

  const workStartDate = new Date(2019, 1, 1);
  const yearsWorked = moment().diff(workStartDate, "years");

  const isMobile = useMediaQuery({ maxWidth: 767 });

  useGSAP(() => {
    const animate = async () => {
      const { gsap } = await import("gsap");
      const { SplitText } = await import("gsap/all");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger, SplitText);

      const start = isMobile ? "top top" : "top top";

      const titleSplit = new SplitText(".hero__title", { type: "words" });
      const subtitleSplit = new SplitText(".hero_subtitles", { type: "lines" });

      // 🔹 Animaciones al cargar (sin scroll)
      const introTimeline = gsap.timeline({ defaults: { ease: "expo.out" } });

      introTimeline.from(
        titleSplit.words,
        {
          opacity: 0,
          yPercent: 100,
          duration: 1.8,
          stagger: 0.06,
        },
        "fadeStart+=1"
      );

      introTimeline.from(
        subtitleSplit.lines,
        {
          opacity: 0,
          yPercent: 100,
          duration: 1.3,
          stagger: 0.06,
        }, // empieza medio segundo después del título
        "fadeStart+=1.5"
      );

      // Hero logo
      if (isMobile) {
        introTimeline.from(
          ".hero__logo-img",
          {
            opacity: 0,
            duration: 4,
            xPercent: -100,
            stagger: 0.06,
          },
          "fadeStart"
        );
      } else {
        introTimeline.from(
          ".hero__logo-img",
          {
            opacity: 0,
            duration: 4,
            xPercent: 100,
            stagger: 0.06,
          },
          "fadeStart"
        );
      }

      // Hero zoom
      introTimeline.fromTo(
        ".hero__photo", // 👉 le damos una clase al wrapper
        { scale: 1.1 },
        { scale: 1, duration: 3, ease: "power1.inOut" },
        "fadeStart" // 🔹 sincronizado con el resto
      );

      // 👉 Estado inicial del About (fuera del flujo y oculto)
      gsap.set([".about__title", ".about__desc"], {
        position: "absolute",
        autoAlpha: 0,
      });

      // 🔹 Animación controlada por scroll
      const heroTimeline = gsap.timeline({
        defaults: { ease: "power1.inOut" },
        scrollTrigger: {
          trigger: heroRef.current,
          start,
          end: "bottom center",
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      const titleHeroDuration = 6;

      // Hero sale

      heroTimeline.to(
        ".hero__subtitle-fade",
        {
          x: isMobile ? "100vw" : "-100vw",
          duration: titleHeroDuration,
          ease: "power1.out",
        },
        "fadeStart"
      ); // empieza un poquito después
      heroTimeline.to(
        ".hero__title-fade",
        {
          x: isMobile ? "100vw" : "-100vw",
          duration: titleHeroDuration,
          ease: "power1.out",
        },
        "fadeStart+=0.2"
      ); // etiqueta de control

      heroTimeline.fromTo(
        ".hero__logo-img",
        {
          opacity: 1,
        },
        {
          opacity: 0,
          duration: 4,
          transformOrigin: "center center",
        },
        "fadeStart"
      );

      // About entra
      if (isMobile) {
        // 👉 Animación del fondo (zoom + desplazamiento)
        heroTimeline.to(
          ".hero__photo",
          {
            scale: 1.2, // zoom suave
            x: () => window.innerWidth * 0.02,
            duration: 10,
            transformOrigin: "center center",
            ease: "none", // 🔹 importante: sin easing, responde lineal al scroll
          },
          "fadeStart"
        );
        // Mobile: entra desde abajo
        heroTimeline.fromTo(
          ".about__title",
          {
            position: "absolute",
            yPercent: 100,
            autoAlpha: 0,
          },
          {
            position: "relative",
            yPercent: 0,
            autoAlpha: 1,
            duration: 1.5,
          },
          `fadeStart+=${titleHeroDuration - 0.2}`
        );

        heroTimeline.fromTo(
          ".about__desc",
          {
            position: "absolute",
            yPercent: 50,
            autoAlpha: 0,
          },
          {
            position: "relative",
            yPercent: 0,
            autoAlpha: 1,
            duration: 1.2,
          },
          ">0.3"
        );
      } else {
        // 👉 Animación del fondo (zoom + desplazamiento)
        heroTimeline.fromTo(
          ".hero__photo",
          {
            scale: 1,
          },
          {
            scale: 1.3, // zoom suave
            x: () => window.innerWidth * 0.2,
            duration: 10,
            transformOrigin: "center center",
            ease: "none", // 🔹 importante: sin easing, responde lineal al scroll
          },
          "fadeStart"
        );
        // Desktop: entra desde la derecha
        heroTimeline.fromTo(
          ".about__title",
          {
            position: "absolute",
            xPercent: 100,
            autoAlpha: 0,
          },
          {
            position: "relative",
            xPercent: 0,
            autoAlpha: 1,
            duration: 1.5,
            ease: "power1.out",
          },
          `fadeStart+=${titleHeroDuration - 0.2}`
        );
        heroTimeline.fromTo(
          ".about__desc",
          {
            position: "absolute",
            yPercent: 50,
            autoAlpha: 0,
          },
          {
            position: "relative",
            yPercent: 0,
            autoAlpha: 1,
            duration: 1.2,
          },
          ">0.3"
        );
      }
    };

    animate();
  });

  return (
    <HeroWrapper ref={heroRef} id="hero">
      <HeroLogo />
      <HeroPhoto />

      {/* Overlay oscuro solo en móvil */}
      <DarkOverlay />

      {/* Texto central */}
      <HeroContent>
        <Title className="hero__title hero__title-fade">
          Software Architect & senior developer
        </Title>
        <SubInfo>
          <div className="hero_subtitles hero__subtitle-fade">
            <span>$450M+</span>
            <p>en proyectos gestionados</p>
          </div>
          <div className="hero_subtitles hero__subtitle-fade">
            <span>{yearsWorked}+</span>
            <p>Years of experience</p>
          </div>
          <div className="hero_subtitles hero__subtitle-fade">
            <span>10+</span>
            <p>Completed project</p>
          </div>
        </SubInfo>

        <AboutWrapper id="about">
          <Title className="about__title">
            I design and build scalable software solutions.
          </Title>
          <div className="about__desc">
            <p>
              Hi, I’m Sebastian Agudelo, a software architect and senior full
              stack developer with a holistic perspective. Throughout my career,
              I’ve partnered with businesses to design and deliver scalable,
              secure, and user-focused systems, creating sustainable value
              through technology. With over {yearsWorked} years of experience, I
              bring technical leadership, strategic thinking, and industry best
              practices to every project, ensuring quality, efficiency, and
              growth.
            </p>
          </div>
        </AboutWrapper>
      </HeroContent>
    </HeroWrapper>
  );
}
