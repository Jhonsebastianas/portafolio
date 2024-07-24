import Link from 'next/link';
import styled from 'styled-components';
import ComingSoon from '../coming-soon/coming-soon.view';

// Estilos con styled-components
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
`;

const Header = styled.section`
  margin-top: 5rem;
  margin-bottom: 5rem;
  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 2rem;
  }

  .botton__container {

    button {
      font-size: 1.25rem;
      margin-right: 2rem;
    }
  }
`

const Section = styled.section`
  padding: 3rem 1.5rem;

  &:nth-child(odd) {
    background: var(--body-color);
  }

  &:nth-child(even) {
    background: linear-gradient(to right, var(--first-color), #805ad5);
    color: white;
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  margin-bottom: .25rem;
`;

const SectionSubtitle = styled.p`
  text-align: center;
  margin-bottom: 1rem;
`;

const CardContainer = styled.div`
  display: grid;
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled.div`
  background: var(--container-color);
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const CardImage = styled.img`
  width: 100%;
  height: auto;
`;

const CardContent = styled.div`
  padding: 1rem;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
`;

const CardText = styled.p`
  color: #718096;
`;

const CardLink = styled(Link)`
  color: #5a67d8;
  display: inline-flex;
  align-items: center;
  margin-top: 1rem;
  font-weight: 500;
`;

const Badge = styled.span`
  background: ${({ variant }) => (variant === 'primary' ? '#5a67d8' : '#edf2f7')};
  color: ${({ variant }) => (variant === 'primary' ? 'white' : '#4a5568')};
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
`;

const Button = styled.button`
  background: ${({ variant }) => (variant === 'secondary' ? '#e2e8f0' : '#5a67d8')};
  color: ${({ variant }) => (variant === 'secondary' ? '#4a5568' : 'white')};
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;

  &:hover {
    background: ${({ variant }) => (variant === 'secondary' ? '#cbd5e0' : '#434190')};
  }
`;

const Footer = styled.footer`
  background: #1a202c;
  color: white;
  padding: 2rem 1.5rem;
  text-align: center;

  a {
    color: #a0aec0;
    transition: color 0.3s;

    &:hover {
      color: white;
    }
  }
`;

const CodeIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const ArrowRightIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

export default function HomeTest() {
  return (
    <Container>
      <Main>
        <Section>
          <div className="container">
            <div>
              <Header>
                <h1>Explora un poco, y adentrate al maravilloso mundo del desarrollo de software.</h1>
                <p className="text-lg md:text-xl">
                  Sumergete en nuestro blog, cursos, y canal de YouTube donde aumentaras tus habilidades como desarrollador y mantente actualizado.
                </p>
                <div className="botton__container">
                  <Link href={"/blog/coming-soon"}>
                    <Button>Explorar cursos</Button>
                  </Link>
                  <Link href={"/blog/articles"}>
                    <Button variant="secondary">Visitar artículos</Button>
                  </Link>
                </div>
              </Header>
            </div>
          </div>
        </Section>

        <Section>
          <div className="container mx-auto px-4 md:px-6">
            <SectionTitle>Últimas entradas del blog</SectionTitle>
            <SectionSubtitle>Consulte nuestros últimos artículos y opiniones</SectionSubtitle>
            <CardContainer>
              <Card>
                <CardImage src="/images/articles/snippets/snippets_0_portada.webp" alt="portada snippets" />
                <CardContent>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">JavaScript</Badge>
                    <span className="text-gray-500 text-sm">May 15, 2023</span>
                  </div>
                  <CardTitle>Snippets en JavaScript: optimiza tus tareas repetitivas en VSCode.</CardTitle>
                  <CardText>
                    Los snippets son códigos o textos que guardamos y queremos reutilizar de forma ágil en ...
                  </CardText>
                  <CardLink href="https://www.jhonsebastianas.com/blog/articles/snippets-en-javaScript-optimiza-tus-tareas-repetitivas-en-vscode">
                    <a>
                        Leer más
                        <ArrowRightIcon className="h-4 w-4" />
                    </a>
                  </CardLink>
                </CardContent>
              </Card>
            </CardContainer>
          </div>
        </Section>
      </Main>
    </Container>
  );
}
