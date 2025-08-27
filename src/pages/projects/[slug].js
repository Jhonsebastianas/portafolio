import React from "react";
import Layout from "@components/layouts/Layout";
import styled from "styled-components";
import portfolio from "@constants/portfolio";
import Link from "next/link";

const Wrapper = styled.section`
  min-height: 100vh;
  padding: 6rem 0;
  background: var(--body-color);
  color: var(--title-color);
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;
`;

const Header = styled.header`
  display: grid;
  gap: 1.5rem;
  margin-bottom: 3rem;

  h1 {
    font-size: clamp(2.5rem, 6vw, 4rem);
    margin: 0;
    color: var(--first-color);
    font-weight: var(--font-semi-bold);
  }

  p {
    color: var(--text-color);
    font-size: var(--normal-font-size);
    line-height: 1.6;
  }
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--first-color);
  text-decoration: none;
  font-weight: var(--font-medium);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    background: var(--first-color-lighter);
    color: var(--first-color-alt);
  }
`;

const Hero = styled.div`
  border-radius: 1.5rem;
  overflow: hidden;
  background: var(--gray-color);
  margin: 2rem 0 3rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;

  span {
    background: var(--first-color-lighter);
    border: 1px solid var(--first-color);
    color: var(--first-color-alt);
    padding: 0.5rem 1rem;
    border-radius: 999px;
    font-size: var(--small-font-size);
    font-weight: var(--font-medium);
  }
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;

  a {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--first-color);
    text-decoration: none;
    font-weight: var(--font-semi-bold);
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    border: 2px solid var(--first-color);
    transition: all 0.2s ease;

    &:hover {
      background: var(--first-color);
      color: white;
      transform: translateY(-2px);
    }
  }
`;

const DescriptionText = styled.p`
  color: var(--text-color);
  font-size: var(--normal-font-size);
  line-height: 1.6;
  white-space: pre-line; /* respeta saltos de línea */
`;

const BulletList = styled.ul`
  margin: 1rem 0;
  padding-left: 1.5rem;

  li {
    margin-bottom: 0.5rem;
    line-height: 1.6;
    color: var(--text-color);
    position: relative;
  }

  li::marker {
    color: var(--first-color); /* color de viñeta */
    font-size: 1.2em;
  }
`;

const SubHeading = styled.p`
  font-weight: 600;
  margin: 1rem 0 0.5rem;
  color: var(--title-color);
`

export default function ProjectDetail({ project }) {
  if (!project) {
    return (
      <Layout>
        <Wrapper>
          <Container>
            <p>Project not found.</p>
            <BackButton href="/">← Back to Portfolio</BackButton>
          </Container>
        </Wrapper>
      </Layout>
    );
  }

  return (
    <Layout>
      <Wrapper>
        <Container>
          <Header>
            <BackButton href="/">← Back to Portfolio</BackButton>
            <h1>{project.title}</h1>
            {/* Si hay viñetas en la descripción */}
            {project.longDescription &&
            project.longDescription.includes("-") ? (
              <>
                <DescriptionText>
                  {project.longDescription
                    .split("\n")
                    .filter((line) => line && !line.startsWith("-"))}
                </DescriptionText>
                <BulletList>
                  {project.longDescription
                    .split("\n")
                    .filter((line) => line.trim().startsWith("-"))
                    .map((line, i) => (
                      <li key={i}>{line.replace("-", "").trim()}</li>
                    ))}
                </BulletList>
              </>
            ) : (
              <DescriptionText>
                {project.longDescription || project.description}
              </DescriptionText>
            )}

            {project.languages && (
              <Chips>
                {project.languages.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </Chips>
            )}
          </Header>
          <Hero>
            <img src={`/images/projects/${project.img}`} alt={project.title} />
          </Hero>
          <ProjectLinks>
            {project.url && (
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                Visit Live ↗
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Code ↗
              </a>
            )}
          </ProjectLinks>
        </Container>
      </Wrapper>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = (portfolio || []).map((p) => ({
    params: { slug: p.slug || encodeURIComponent(p.title.toLowerCase()) },
  }));
  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const project =
    (portfolio || []).find(
      (p) =>
        (p.slug || encodeURIComponent(p.title.toLowerCase())) === params.slug
    ) || null;
  return { props: { project } };
}
