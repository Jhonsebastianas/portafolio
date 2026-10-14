import Link from "next/link"
import styled, { keyframes } from "styled-components"

/*=============================================
  KEYFRAMES
===============================================*/
const shimmerLine = keyframes`
  0%   { transform: scaleX(0); opacity: 0; }
  100% { transform: scaleX(1); opacity: 1; }
`;

/*=============================================
  STYLED COMPONENTS
===============================================*/
const StyledFooter = styled.footer`
  background-color: var(--container-color);
  border-top: 1px solid var(--first-color-lighter);
  position: relative;

  /* Línea de acento superior animada */
  &::before {
    content: '';
    position: absolute;
    top: -3px;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(
      90deg,
      var(--first-color) 0%,
      hsl(calc(var(--hue-color) + 30), 70%, 65%) 50%,
      var(--first-color) 100%
    );
    transform-origin: left;
    animation: ${shimmerLine} 0.8s ease forwards;
  }
`;

const FooterTop = styled.div`
  padding: 3rem 0 2rem;
`;

const FooterGrid = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const BrandColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const BrandLogo = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
`;

const LogoDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--first-color);
  display: inline-block;
  flex-shrink: 0;
`;

const LogoText = styled.span`
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--title-color);
  letter-spacing: -0.02em;
`;

const BrandTagline = styled.p`
  font-size: 0.85rem;
  color: var(--text-color);
  line-height: 1.65;
  max-width: 260px;
`;

const SocialRow = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const SocialLink = styled.a`
  width: 34px;
  height: 34px;
  border-radius: 8px;
  border: 1px solid var(--gray-color);
  background: var(--body-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--text-color);
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--first-color);
    color: var(--first-color);
    background: hsla(var(--hue-color), 69%, 61%, 0.08);
    transform: translateY(-2px);
  }
`;

const NavColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const NavColumnTitle = styled.p`
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-color-light);
  margin-bottom: 0.5rem;
`;

const NavLink = styled.a`
  font-size: 0.88rem;
  color: var(--text-color);
  text-decoration: none;
  transition: color 0.2s ease, padding-left 0.2s ease;
  display: inline-block;

  &:hover {
    color: var(--first-color);
    padding-left: 4px;
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid var(--gray-color);
  padding: 1.25rem 0;
`;

const FooterBottomInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Copyright = styled.p`
  font-size: 0.78rem;
  color: var(--text-color-light);
`;

const FooterBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.75rem;
  color: var(--text-color-light);

  span.accent {
    color: var(--first-color);
    font-weight: 600;
  }
`;

/*=============================================
  COMPONENT
===============================================*/
const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <StyledFooter>
            <FooterTop>
                <FooterGrid>
                    {/* Columna de marca */}
                    <BrandColumn>
                        <BrandLogo>
                            <LogoDot />
                            <LogoText>Blog SA</LogoText>
                        </BrandLogo>
                        <BrandTagline>
                            Artículos, guías y recursos sobre desarrollo de software
                            para todos los niveles.
                        </BrandTagline>
                        <SocialRow>
                            <SocialLink
                                href="https://www.youtube.com/@jhonsebastianas"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="YouTube"
                            >
                                <i className="uil uil-youtube" />
                            </SocialLink>
                            <SocialLink
                                href="https://www.instagram.com/jhonsebastianas/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                            >
                                <i className="uil uil-instagram" />
                            </SocialLink>
                            <SocialLink
                                href="https://twitter.com/JhonSebastianAS"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Twitter / X"
                            >
                                <i className="uil uil-twitter-alt" />
                            </SocialLink>
                        </SocialRow>
                    </BrandColumn>

                    {/* Columna contenido */}
                    <NavColumn>
                        <NavColumnTitle>Contenido</NavColumnTitle>
                        <Link href="/blog/articles" passHref>
                            <NavLink>Artículos</NavLink>
                        </Link>
                        <Link href="/blog/coming-soon" passHref>
                            <NavLink>Cursos</NavLink>
                        </Link>
                        <Link href="/apps" passHref>
                            <NavLink>Apps & Herramientas</NavLink>
                        </Link>
                        <NavLink
                            href="https://www.youtube.com/@jhonsebastianas"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            YouTube
                        </NavLink>
                    </NavColumn>

                    {/* Columna más */}
                    <NavColumn>
                        <NavColumnTitle>Más</NavColumnTitle>
                        <Link href="/blog/about" passHref>
                            <NavLink>Acerca de</NavLink>
                        </Link>
                        <Link href="/blog/contactme" passHref>
                            <NavLink>Contacto</NavLink>
                        </Link>
                        <Link href="/" passHref>
                            <NavLink>Portafolio</NavLink>
                        </Link>
                    </NavColumn>
                </FooterGrid>
            </FooterTop>

            <FooterBottom>
                <FooterBottomInner>
                    <Copyright>
                        © {year} Jhon Sebastian Agudelo. Todos los derechos reservados.
                    </Copyright>
                    <FooterBadge>
                        Hecho con <span className="accent">♥</span> para devs
                    </FooterBadge>
                </FooterBottomInner>
            </FooterBottom>
        </StyledFooter>
    )
}

export default Footer