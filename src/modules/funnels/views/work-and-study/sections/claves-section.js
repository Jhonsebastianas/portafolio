import styled from "styled-components";
import CardGradiant from "@modules/funnels/components/card-gradiant";

const Section = styled.section`
  background: black;
  color: white;
  padding: 4rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h2`
  font-size: 2.2rem;
  font-weight: bold;
  color: white;
`;

const Subtitle = styled.p`
  margin-top: 1rem;
  color: #ccc;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background-color: #1a1a1a;
  padding: 1.5rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  box-shadow: 0 0 0 transparent;

  &:hover {
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.15);
    transform: translateY(-4px);
  }
`;

const CardTitle = styled.h3`
  font-size: 0.9rem;
  color: #aaa;
  margin-bottom: 0.3rem;
`;

const CardDate = styled.p`
  color: var(--first-color);
  font-size: 0.8rem;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
`;

const CardContent = styled.p`
  font-size: 1rem;
  font-weight: 500;
`;

const HighlightWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 2rem;
  margin-top: 3rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const HighlightCard = styled(Card)`
  text-align: left;
  padding: 0;

  ${CardTitle} {
    color: #aaa;
    font-size: 0.95rem;
  }

  ${CardContent} {
    font-size: 1.4rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  ${CardDate} {
    font-size: 0.9rem;
  }

  p:last-child {
    font-size: 0.9rem;
    color: #ccc;
    margin-top: 0.8rem;
  }
`;

const HandImage = styled.img`
  max-width: 100%;
  max-height: 20%;
  object-fit: contain;
  border-radius: 0;

  @media (max-width: 900px) {
    display: none;
  }
`;

const ClavesSection = () => {
  return (
    <Section>
      <Container>
        <Header>
          <Title>
            Organiza tu vida con 7 claves y crea el camino para estudiar,
            trabajar y alcanzar el éxito profesional.
          </Title>
          <Subtitle>
            Estas son las <strong>7 claves</strong> que descubrirás en este
            ebook gratuito.
          </Subtitle>
        </Header>

        <Grid>
          <CardGradiant>
            <CardTitle>CLAVE 1</CardTitle>
            <CardDate>Horario</CardDate>
            <CardContent>
              El horario de clase sera tú amigo o enemigo durante todo el
              semestre, así que elige bien.
            </CardContent>
          </CardGradiant>
          <CardGradiant>
            <CardTitle>CLAVE 2</CardTitle>
            <CardDate>Espacio de estudio</CardDate>
            <CardContent>
              Un lugar cómodo y libre de distracciones puede hacer la diferencia
              entre avanzar o quedarte estancado.
            </CardContent>
          </CardGradiant>
          <CardGradiant>
            <CardTitle>CLAVE 3</CardTitle>
            <CardDate>Anota Fechas Importantes</CardDate>
            <CardContent>
              Es prioridad que no se te pase ninguna fecha importante, como la
              entrega de un trabajo o examen final.
            </CardContent>
          </CardGradiant>
          <CardGradiant>
            <CardTitle>CLAVE 4</CardTitle>
            <CardDate>Materias Que Desbloquean Otras</CardDate>
            <CardContent>
              Hay materias que son prerequisitos de otras, no planificarlas
              puede significar ver uno o más semestres adicionales.
            </CardContent>
          </CardGradiant>
          <CardGradiant>
            <CardTitle>CLAVE 5</CardTitle>
            <CardDate>Tu Pasión</CardDate>
            <CardContent>
              No todo es trabajo y estudio. necesitas equilibrar tu tiempo para
              evitar la frustración.
            </CardContent>
          </CardGradiant>
          <CardGradiant>
            <CardTitle>CLAVE 6</CardTitle>
            <CardDate>Una Nota No Te Define</CardDate>
            <CardContent>
              Las calificaciones son importantes, pero no determinan tu éxito.
            </CardContent>
          </CardGradiant>
        </Grid>

        <HighlightWrapper>
          <HighlightCard>
            <CardGradiant>
              <CardTitle>CLAVE 7 · LA MÁS IMPORTANTE</CardTitle>
              <CardContent>
                El conocimiento crece cuando se comparte, y los sueños se
                alcanzan más fácil cuando hay quien te acompaña en el proceso.
              </CardContent>
              <CardDate>Conecta Con Tus Compañeros</CardDate>
              <p>
                Dicen que si quieres llegar rápido, vayas solo, pero si quieres
                llegar lejos… ve acompañado.
              </p>
            </CardGradiant>
          </HighlightCard>

          {/* <HandImage src="/images/funnels/choque_palmas.png" alt="Mockup de mano" /> */}
        </HighlightWrapper>
      </Container>
    </Section>
  );
};

export default ClavesSection;
