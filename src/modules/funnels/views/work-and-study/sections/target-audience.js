import styled from "styled-components";

const Section = styled.section`
  background: linear-gradient(to bottom left, #0f0f0f, var(--first-color));
  color: #000;
  padding: 6rem 2rem;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  text-align: center;
  
`;

const Title = styled.h2`
  font-size: 2rem;
  color: white;
  font-weight: bold;
  margin-bottom: 3rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

const Card = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem 1.5rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Emoji = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const CardText = styled.p`
  font-size: 0.95rem;
  color: #333;
`;

const TargetAudienceSection = () => {
  return (
    <Section>
      <Container>
        <Title>¿Para quién es este ebook?</Title>
        <Grid>
          <Card>
            <Emoji>🎓</Emoji>
            <CardTitle>Estudiantes que quieren destacar</CardTitle>
            <CardText>
              Si estás en la universidad o estás por empezar, este ebook te
              ayudará a organizarte, mantenerte enfocado y estudiar de forma más
              efectiva.
            </CardText>
          </Card>
          <Card>
            <Emoji>📈</Emoji>
            <CardTitle>Personas que quieren estudiar con propósito</CardTitle>
            <CardText>
              Si sientes que estudias sin rumbo claro o te cuesta mantener la
              motivación, aquí encontrarás métodos para enfocarte y conectar tus
              estudios con tu futuro laboral.
            </CardText>
          </Card>
          <Card>
            <Emoji>💼</Emoji>
            <CardTitle>Trabajadores que desean seguir formándose</CardTitle>
            <CardText>
              Si ya estás en el mundo laboral pero quieres seguir creciendo
              profesionalmente, esto te ayudará a integrar el estudio en tu
              rutina sin sentirte desbordado.
            </CardText>
          </Card>
          <Card>
            <Emoji>⏳</Emoji>
            <CardTitle>Personas que sienten que no tienen tiempo</CardTitle>
            <CardText>
              Si vives con la sensación de que no te alcanza el día, aprenderás
              a organizar tu tiempo y energía para rendir mejor sin quemarte.
            </CardText>
          </Card>
          <Card>
            <Emoji>💼</Emoji>
            <CardTitle>
              Emprendedores que quieren respaldar su experiencia con un título
            </CardTitle>
            <CardText>
              Si ya estás emprendiendo o tienes un negocio, pero sabes que un
              título profesional puede abrirte nuevas puertas o fortalecer tu
              credibilidad, este ebook te ayudará a compatibilizar tus estudios
              con tu actividad empresarial.
            </CardText>
          </Card>
        </Grid>
      </Container>
    </Section>
  );
};

export default TargetAudienceSection;
