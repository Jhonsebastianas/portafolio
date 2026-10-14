import React, { useState, useMemo } from "react";
import styled from "styled-components";
import Link from "next/link";
import { APPS_DATA, CATEGORIES } from "../../data/appsData";

/*=============================================
  STYLED COMPONENTS
=============================================*/
const HubContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem 5rem;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem 4rem;
  }
`;

const HubHero = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  padding-top: 1rem;
  position: relative;

  .hub-tag {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.4rem 1rem;
    border-radius: 30px;
    background: hsla(var(--hue-color), 69%, 61%, 0.12);
    color: var(--first-color);
    font-size: var(--smaller-font-size);
    font-weight: 600;
    margin-bottom: 1rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  h1 {
    font-size: var(--big-font-size);
    font-weight: 700;
    color: var(--title-color);
    letter-spacing: -0.025em;
    margin-bottom: 1rem;

    .accent-gradient {
      background: linear-gradient(135deg, var(--first-color) 0%, #8b5cf6 50%, #d946ef 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  p {
    max-width: 650px;
    margin: 0 auto;
    font-size: var(--normal-font-size);
    color: var(--text-color);
    line-height: 1.65;
  }
`;

const SearchFilterBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 2.5rem;
`;

const SearchInputWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;

  i {
    position: absolute;
    left: 1.1rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.25rem;
    color: var(--text-color-light);
  }

  input {
    width: 100%;
    padding: 0.85rem 1rem 0.85rem 3rem;
    border-radius: 50px;
    border: 1px solid var(--gray-color);
    background: var(--container-color);
    color: var(--title-color);
    font-family: var(--body-font);
    font-size: var(--normal-font-size);
    outline: none;
    box-shadow: 0 4px 16px -2px rgba(0, 0, 0, 0.05);
    transition: all 0.25s ease;

    &:focus {
      border-color: var(--first-color);
      box-shadow: 0 0 0 4px hsla(var(--hue-color), 69%, 61%, 0.15);
    }

    &::placeholder {
      color: var(--text-color-light);
    }
  }
`;

const CategoryTabs = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const CategoryTab = styled.button`
  padding: 0.45rem 1.1rem;
  border-radius: 20px;
  font-size: var(--small-font-size);
  font-weight: ${(props) => (props.$active ? "600" : "500")};
  font-family: var(--body-font);
  border: 1px solid ${(props) => (props.$active ? "var(--first-color)" : "var(--gray-color)")};
  background: ${(props) =>
    props.$active ? "var(--first-color)" : "var(--container-color)"};
  color: ${(props) => (props.$active ? "#ffffff" : "var(--text-color)")};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--first-color);
    color: ${(props) => (props.$active ? "#ffffff" : "var(--first-color)")};
    transform: translateY(-1px);
  }
`;

const AppsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.75rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 650px) {
    grid-template-columns: 1fr;
  }
`;

const AppCard = styled.div`
  background: var(--container-color);
  border: 1px solid var(--gray-color);
  border-radius: 1.25rem;
  padding: 1.75rem 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  box-shadow: 0 6px 24px -4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${(props) => props.$gradient || "var(--first-color)"};
    opacity: 0.8;
  }

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 36px -6px rgba(0, 0, 0, 0.12);
    border-color: var(--first-color-lighter);

    .launch-link {
      background: var(--first-color);
      color: #ffffff;
      transform: translateX(4px);
    }
  }
`;

const CardTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1.25rem;
`;

const IconBox = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: ${(props) => props.$gradient || "var(--first-color)"};
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
`;

const Badge = styled.span`
  padding: 0.25rem 0.65rem;
  border-radius: 20px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  background: ${(props) => {
    switch (props.$color) {
      case "success":
        return "rgba(16, 185, 129, 0.15)";
      case "warning":
        return "rgba(245, 158, 11, 0.15)";
      default:
        return "hsla(var(--hue-color), 69%, 61%, 0.15)";
    }
  }};
  color: ${(props) => {
    switch (props.$color) {
      case "success":
        return "#10b981";
      case "warning":
        return "#f59e0b";
      default:
        return "var(--first-color)";
    }
  }};
`;

const CardBody = styled.div`
  flex: 1;
  margin-bottom: 1.5rem;

  .category-label {
    font-size: var(--smaller-font-size);
    font-weight: 600;
    color: var(--first-color);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.35rem;
  }

  h2 {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--title-color);
    margin: 0 0 0.65rem 0;
    line-height: 1.35;
  }

  p {
    font-size: var(--small-font-size);
    color: var(--text-color);
    line-height: 1.55;
    margin: 0 0 1rem 0;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: 0.5rem;
`;

const TagChip = styled.span`
  font-size: 0.72rem;
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  background: var(--body-color);
  color: var(--text-color);
  border: 1px solid var(--gray-color);
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid var(--gray-color);
`;

const LaunchButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 1rem;
  border-radius: 0.5rem;
  background: hsla(var(--hue-color), 69%, 61%, 0.1);
  color: var(--first-color);
  font-size: var(--small-font-size);
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;

  i {
    font-size: 1.1rem;
    transition: transform 0.2s ease;
  }

  &:hover {
    background: var(--first-color);
    color: #ffffff;

    i {
      transform: translateX(3px);
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 1rem;
  background: var(--container-color);
  border-radius: 1rem;
  border: 1px dashed var(--gray-color);
  grid-column: 1 / -1;

  i {
    font-size: 2.5rem;
    color: var(--first-color);
    margin-bottom: 0.75rem;
  }

  h3 {
    font-size: 1.25rem;
    color: var(--title-color);
    margin-bottom: 0.5rem;
  }

  p {
    color: var(--text-color);
    font-size: var(--normal-font-size);
  }
`;

const SuggestionBanner = styled.div`
  margin-top: 4rem;
  background: linear-gradient(
    135deg,
    hsla(var(--hue-color), 69%, 61%, 0.08) 0%,
    hsla(var(--hue-color), 69%, 61%, 0.02) 100%
  );
  border: 1px solid var(--first-color-lighter);
  border-radius: 1.25rem;
  padding: 2.25rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    align-items: stretch;
  }

  .banner-content {
    max-width: 600px;

    h3 {
      font-size: 1.35rem;
      font-weight: 700;
      color: var(--title-color);
      margin-bottom: 0.5rem;
    }

    p {
      color: var(--text-color);
      font-size: var(--small-font-size);
      margin: 0;
      line-height: 1.6;
    }
  }

  .banner-action {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.85rem 1.6rem;
    border-radius: 0.65rem;
    background: var(--first-color);
    color: #ffffff;
    font-weight: 600;
    font-size: var(--normal-font-size);
    text-decoration: none;
    transition: all 0.25s ease;
    white-space: nowrap;

    &:hover {
      background: var(--first-color-alt);
      transform: translateY(-2px);
      box-shadow: 0 8px 20px -2px hsla(var(--hue-color), 69%, 61%, 0.35);
    }
  }
`;

/*=============================================
  MAIN COMPONENT
=============================================*/
const AppsHub = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  // Filtrado reactivo de aplicaciones
  const filteredApps = useMemo(() => {
    return APPS_DATA.filter((app) => {
      const matchesCategory =
        selectedCategory === "Todas" || app.category === selectedCategory;
      const matchesSearch =
        searchTerm.trim() === "" ||
        app.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <HubContainer>
      {/* Hero del Hub */}
      <HubHero>
        <span className="hub-tag">
          <i className="uil uil-apps" /> Catálogo de Aplicaciones
        </span>
        <h1>
          Herramientas Digitales & <span className="accent-gradient">Micro-Apps</span>
        </h1>
        <p>
          Explora nuestra colección de calculadoras interactivas, utilidades y simuladores
          diseñados para facilitar tus cálculos financieros y tareas cotidianas.
        </p>
      </HubHero>

      {/* Buscador y Filtros por Categoría */}
      <SearchFilterBar>
        <SearchInputWrapper>
          <i className="uil uil-search" />
          <input
            type="text"
            placeholder="Buscar por nombre, descripción o etiqueta..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Buscar aplicaciones"
          />
        </SearchInputWrapper>

        <CategoryTabs>
          {CATEGORIES.map((cat) => (
            <CategoryTab
              key={cat}
              type="button"
              $active={selectedCategory === cat}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </CategoryTab>
          ))}
        </CategoryTabs>
      </SearchFilterBar>

      {/* Cuadrícula de Aplicaciones */}
      <AppsGrid>
        {filteredApps.length > 0 ? (
          filteredApps.map((app) => (
            <AppCard key={app.id} $gradient={app.gradient}>
              <CardTop>
                <IconBox $gradient={app.gradient}>
                  <i className={`uil ${app.icon}`} />
                </IconBox>
                {app.badge && (
                  <Badge $color={app.badgeColor}>{app.badge}</Badge>
                )}
              </CardTop>

              <CardBody>
                <div className="category-label">{app.category}</div>
                <h2>{app.title}</h2>
                <p>{app.description}</p>

                <TagsContainer>
                  {app.tags.map((tag) => (
                    <TagChip key={tag}>#{tag}</TagChip>
                  ))}
                </TagsContainer>
              </CardBody>

              <CardFooter>
                <span style={{ fontSize: "var(--smaller-font-size)", color: "var(--text-color-light)" }}>
                  Herramienta interactiva
                </span>
                <Link href={app.path} passHref>
                  <LaunchButton className="launch-link">
                    <span>Abrir App</span>
                    <i className="uil uil-arrow-right" />
                  </LaunchButton>
                </Link>
              </CardFooter>
            </AppCard>
          ))
        ) : (
          <EmptyState>
            <i className="uil uil-search-alt" />
            <h3>No se encontraron aplicaciones</h3>
            <p>
              No hay herramientas que coincidan con &quot;{searchTerm}&quot; en la categoría seleccionada.
            </p>
          </EmptyState>
        )}
      </AppsGrid>

      {/* Banner de Sugerencias */}
      <SuggestionBanner>
        <div className="banner-content">
          <h3>¿Necesitas una calculadora o herramienta a medida?</h3>
          <p>
            Desarrollo soluciones interactivas personalizadas para negocios, finanzas o proyectos académicos.
            Escríbeme con tu idea y la construimos.
          </p>
        </div>
        <Link href="/blog/contactme" passHref>
          <a className="banner-action">
            <i className="uil uil-envelope-alt" />
            <span>Contáctame</span>
          </a>
        </Link>
      </SuggestionBanner>
    </HubContainer>
  );
};

export default AppsHub;
