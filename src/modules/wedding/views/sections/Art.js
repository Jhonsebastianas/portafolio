import { useEffect } from 'react';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';

/* --- Styled components --- */
const Section   = styled.section`
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
`;
const Container = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  height: 100%;
  padding-top: 5rem;
  padding-left: 1rem;
  padding-right: 1rem;
`;
const Heading   = styled.h2`
  font-size: clamp(2rem, 6vw, 3.5rem);
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
`;
const Content   = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 2rem;
  align-items: center;
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;
const List      = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  li {
    display: flex;
    align-items: center;
    gap: .5rem;
    img { width: 20px; height: 20px; }
    p  { line-height: 1.3; }
  }
`;
const Cocktail  = styled.div`
  position: relative;
  width: min(420px, 80vw);
  aspect-ratio: 3/4;
  margin: 0 auto;
`;
const MaskedImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;

  /* ✨ La “máscara” */
  mask-image: url('/images/wedding/mask_img-door.png');
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: 50%;
`;
const MaskedContainer = styled.div`
  margin-top: 4rem;
  text-align: center;
  h2 { ${Heading} }       /* reutilizamos estilos */
  #masked-content {
    opacity: 0;
    transition: opacity .3s;
    h3 { font-size: 1.5rem; margin-bottom: .5rem; }
    p  { max-width: 36ch; margin: 0 auto; line-height: 1.4; }
  }
`;

/* --- Componente --- */
const Art = ({ featureLists = [], goodLists = [] }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    let ctx;                         //  Para poder limpiar la animación

    /* 1) Importa GSAP y ScrollTrigger solo en el cliente */
    (async () => {
      const gsap = (await import('gsap')).default;
      const ScrollTrigger = (await import('gsap/ScrollTrigger')).default;
      gsap.registerPlugin(ScrollTrigger);

      const start = isMobile ? 'top 20%' : 'bottom top';

      /* 2) Crea un contexto para que GSAP limpie estilos al salir  */
      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: '#art',
            start,
            end: 'bottom center',
            scrub: 1.5,
            pin: true,
          },
        });

        tl.to('.will-fade', {
            opacity: 0,
            stagger: 0.2,
            ease: 'power1.inOut',
          })
          .to('.masked-img', {
            scale: 1.3,
            maskPosition: 'center',
            maskSize: '400%',
            duration: 1,
            ease: 'power1.inOut',
          })
          .to('#masked-content', { opacity: 1, duration: 1, ease: 'power1.inOut' });
      }, '#art');
    })();

    /* 3) Limpia al desmontar */
    return () => ctx && ctx.revert();
  }, [isMobile]);

  return (
    <Section id="art">
      <Container>
        <Heading className="will-fade">The ART</Heading>

        <Content>
          <List className="will-fade">
            {goodLists.map((feature, i) => (
              <li key={`good-${i}`}>
                <img src="/images/check.png" alt="check" />
                <p>{feature}</p>
              </li>
            ))}
          </List>

          <Cocktail>
            <MaskedImg
              className="masked-img abs-center"
              src="/images/wedding/wedding_day.jpg"
              alt="cocktail"
            />
          </Cocktail>

          <List className="will-fade">
            {featureLists.map((feature, i) => (
              <li key={`feature-${i}`}>
                <img src="/images/check.png" alt="check" />
                <p>{feature}</p>
              </li>
            ))}
          </List>
        </Content>

        <MaskedContainer className="masked-container">
          <Heading className="will-fade">Sip‑Worthy Perfection</Heading>
          <div id="masked-content">
            <h3>Made with Craft, Poured with Passion</h3>
            <p>
              This isn't just a drink. It's a carefully crafted moment made just
              for you.
            </p>
          </div>
        </MaskedContainer>
      </Container>
    </Section>
  );
};

export default Art;
