import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import portfolioProjects from "@constants/portfolio";
import { createHorizontalScroll } from "../../util/animations";

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
    margin-bottom: 2rem;
  }
`;

const RightRail = styled.div`
  grid-column: span 8;
  position: relative;
  overflow: visible;

  @media (max-width: 1024px) {
    grid-column: span 12;
    overflow-x: auto;
  }
`;

const Cards = styled.div`
  display: grid;
  gap: 2rem;
  grid-auto-flow: column;
  grid-auto-columns: minmax(600px, 50vw);
  padding-right: 4rem;

  @media (max-width: 1024px) {
    grid-auto-columns: 100%;
    padding-right: 0;
  }
`;

const Card = styled.article`
  border-radius: 1.5rem;
  overflow: visible;
  background: var(--container-color);
  border: 2px solid var(--gray-color);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  position: relative;
  z-index: 1;

  &:hover {
    #transform: translateY(-8px);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    border-color: var(--first-color);
    z-index: 10;
  }
`;

const Thumb = styled.div`
  aspect-ratio: 16/9;
  position: relative;
  overflow: hidden;
  margin: 1.5rem;
  transition: all 0.4s ease;

  width: 95%;

  /* alineación configurable */
  margin-left: ${({ align }) =>
    align === "left" ? "0" : align === "center" ? "auto" : "auto"};
  margin-right: ${({ align }) =>
    align === "right" ? "0" : align === "center" ? "auto" : "auto"};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.4s ease;
  }

  ${Card}:hover & {
    transform: translateY(-10px);
  }
`;

const Meta = styled.div`
  padding: 0 1.5rem 1.5rem;
  display: flex;
  flex-direction: column-reverse;
  gap: 1rem;
  transition: all 0.4s ease;
`;

const Title = styled.h3`
  font-size: clamp(1.5rem, 3vw, 2rem);
  margin: 0;
  color: var(--title-color);
  font-weight: var(--font-semi-bold);
  transition: color 0.3s ease;
`;

const Categories = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;

  span {
    background: var(--first-color-lighter);
    color: var(--first-color-alt);
    padding: 0.4rem 0.8rem;
    border-radius: 999px;
    font-size: var(--smaller-font-size);
    font-weight: var(--font-medium);
    border: 1px solid var(--first-color);
    transition: all 0.3s ease;
  }
`;

const HoverContent = styled.div`
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.4s ease;
  margin-top: 1rem;

  ${Card}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Description = styled.p`
  color: var(--text-color);
  font-size: var(--normal-font-size);
  line-height: 1.6;
  margin: 0 0 1rem;
  opacity: 0.9;
`;

const Languages = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;

  span {
    background: var(--gray-color);
    color: var(--text-color);
    padding: 0.3rem 0.7rem;
    border-radius: 999px;
    font-size: var(--smaller-font-size);
    font-weight: var(--font-medium);
    border: 1px solid var(--gray-color);
  }
`;

const Footer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  a {
    color: var(--first-color);
    font-weight: var(--font-semi-bold);
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    transition: all 0.2s ease;

    &:hover {
      background: var(--first-color-lighter);
      color: var(--first-color-alt);
    }
  }
`;

const ProjectsShowcase = () => {
  const railRef = useRef(null);
  const sectionRef = useRef(null);
  const leftCopyRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let cleanup = () => {};

    const setup = async () => {
      try {
        // Solo activar el scroll horizontal con GSAP en desktop
        if (window.innerWidth < 1024) return;

        const rail = railRef.current;
        const leftCopy = leftCopyRef.current;
        if (!rail || !leftCopy) return;

        const totalWidth = rail.scrollWidth;
        const viewport = rail.clientWidth;
        const scrollDistance = totalWidth - viewport;

        if (scrollDistance <= 0) return;

        // Usar la utilidad de animación para el scroll horizontal
        const tl = await createHorizontalScroll(
          sectionRef.current,
          rail,
          {
            start: "top top",
            end: `+=${scrollDistance + window.innerHeight}`,
          },
          (timeline) => {
            // Añadir animación para que el texto izquierdo se mueva hacia la izquierda
            // en el mismo timeline, para que estén perfectamente sincronizados
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
              {portfolioProjects.map((p) => (
                <Card key={p.slug || p.title}>
                  <Thumb align={p.align || "right"}>
                    <img src={`/images/projects/${p.img}`} alt={p.title} />
                  </Thumb>
                  <Meta>
                    <div>
                      <Title>{p.title}</Title>
                      <Categories>
                        {p.categories &&
                          p.categories.map((cat) => (
                            <span key={cat}>
                              {cat === "companie"
                                ? "Company"
                                : cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </span>
                          ))}
                      </Categories>
                    </div>
                    <HoverContent>
                      <Description>{p.description}</Description>
                      {p.languages && (
                        <Languages>
                          {p.languages.map((t) => (
                            <span key={t}>{t}</span>
                          ))}
                        </Languages>
                      )}
                      <Footer>
                        <Link
                          href={`/projects/${
                            p.slug || encodeURIComponent(p.title.toLowerCase())
                          }`}
                        >
                          View details →
                        </Link>
                        {p.url && (
                          <a
                            href={p.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Live ↗
                          </a>
                        )}
                      </Footer>
                    </HoverContent>
                  </Meta>
                </Card>
              ))}
            </Cards>
          </RightRail>
        </Grid>
      </Section>
    </>
  );
};

export default ProjectsShowcase;
