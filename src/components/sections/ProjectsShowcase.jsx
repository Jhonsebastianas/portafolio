import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import portfolioProjects from "@constants/portfolio";
import { createHorizontalScroll } from "../../util/animations";
import CardWrapper from "@components/commons/CardWrapper";
import { useMediaQuery } from "react-responsive";

const Section = styled.section`
  min-height: 100vh;
  padding: 6rem 0;
  background: var(--body-color);
  color: var(--title-color);
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;
`;

const LeftCopy = styled.div`
  grid-column: span 4;
  align-self: center;
  position: relative;
  z-index: 0;
  transition: transform 0.4s ease;

  @media (max-width: 1024px) {
    grid-column: span 12;
    position: static;
    margin-bottom: 3rem;
  }

  h2 {
    font-size: clamp(2.5rem, 6vw, 5rem);
    line-height: 0.95;
    margin: 0 0 1.5rem;
    color: var(--first-color);
    font-weight: var(--font-semi-bold);
  }

  p {
    color: var(--text-color);
    max-width: 38ch;
    font-size: var(--normal-font-size);
    line-height: 1.6;
  }
`;

const RightRail = styled.div`
  grid-column: span 8;
  position: relative;
  overflow: visible;

  @media (max-width: 1024px) {
    grid-column: span 12;
    overflow-x: hidden;
  }
`;

const Cards = styled.div`
  display: grid;
  gap: 2rem;
  grid-auto-flow: column;
  grid-auto-columns: minmax(560px, 50vw);
  padding-right: 4rem;

  @media (max-width: 1024px) {
    grid-auto-columns: 100%;
    padding-right: 0;
  }
`;

const ProjectsShowcase = () => {
  const railRef = useRef(null);
  const sectionRef = useRef(null);
  const leftCopyRef = useRef(null);
  const animationRef = useRef(null);

  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    let cleanup = () => {};

    const setup = async () => {
      try {
        // Solo activar el scroll horizontal con GSAP en desktop
        //if (window.innerWidth < 1024) return;

        const rail = railRef.current;
        const leftCopy = leftCopyRef.current;
        if (!rail || !leftCopy) return;

        const totalWidth = rail.scrollWidth;
        const viewport = rail.clientWidth;
        const scrollDistance = totalWidth - viewport;

        if (scrollDistance <= 0) return;

        const start = isMobile ? 'top -10%' : 'top top';

        // Usar la utilidad de animación para el scroll horizontal
        const tl = await createHorizontalScroll(
          sectionRef.current,
          rail,
          {
            start,
            end: `+=${scrollDistance + window.innerHeight}`,
          },
          (timeline) => {
            // Añadir animación para que el texto izquierdo se mueva hacia la izquierda
            // en el mismo timeline, para que estén perfectamente sincronizados
            if (isMobile) {
              return;
            }
            timeline.to(
              leftCopy,
              {
                x: () => -scrollDistance * 0.2, // Se mueve 30% de la distancia del scroll
                ease: "none",
              },
              0
            ); // Comienza al mismo tiempo que el scroll horizontal
          }
        );

        if (tl) {
          animationRef.current = tl;
          cleanup = () => {
            tl.kill();
          };
        }
      } catch (e) {
        console.warn("Horizontal scroll not initialized:", e);
      }
    };

    // Delay para asegurar que el DOM esté listo
    const timer = setTimeout(setup, 100);

    return () => {
      clearTimeout(timer);
      if (animationRef.current) {
        animationRef.current.kill();
      }
      cleanup();
    };
  }, []);

  return (
    <>
      <Section id="portfolio" ref={sectionRef}>
        <Grid>
          <LeftCopy ref={leftCopyRef}>
            <h2>
              Show
              <br />
              not tell
            </h2>
            <p>
              Selected work spanning product, web and platform engineering.
              Click any project to see the full story, architecture and impact.
            </p>
          </LeftCopy>
          <RightRail>
            <Cards ref={railRef}>
              {portfolioProjects.map((project) => {
                const { background, description, img, job, slug, title } = project;
                const exploreLink = `/projects/${slug || encodeURIComponent(p.title.toLowerCase())}`;
                const imageProject = `/images/projects/${img}`;
                return (
                  <CardWrapper
                    title={title}
                    subtitle={job || null}
                    description={description}
                    image={imageProject}
                    bg={background}
                    link={exploreLink}
                  />
                );
              })}
            </Cards>
          </RightRail>
        </Grid>
      </Section>
    </>
  );
};

export default ProjectsShowcase;
