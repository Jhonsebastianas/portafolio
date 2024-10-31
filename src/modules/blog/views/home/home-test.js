import Link from 'next/link';
import styled from 'styled-components';
import ArticleCard from '@modules/blog/components/article-card/article-card.component';
import { articles } from '@modules/blog/data/articles';

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
              { articles.map((article, index) => {
                return <ArticleCard key={article.title + index} article={article} />
              }) }
            </CardContainer>
          </div>
        </Section>
      </Main>
    </Container>
  );
}
