import React, { useEffect, useRef } from 'react';
import ImageNext from 'next/image'
import styled from 'styled-components';
// import { srConfig } from '@config'
// import UTILS from '@utils/sreveal'

const StyledAboutSection = styled.section`
  max-width: 900px;
  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;
    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;
    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;
  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }
  .wrapper {
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);
    &:hover,
    &:focus {
      background: transparent;
      outline: 0;
      &:after {
        top: 15px;
        left: 15px;
      }
      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }
    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }
    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }
    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }
    &:after {
      border: 2px solid var(--green);
      top: 20px;
      left: 20px;
      z-index: -1;
    }
  }
`;

const About = () => {

  const revealContainer = useRef(null);

  useEffect(() => {
    // UTILS.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = ['JavaScript (ES6+)', 'Java 8^', 'HTML & (S)CSS', 'React.js', 'Angular.js', 'Node.js', 'SQL (Oracle, MySql)', 'Devops'];

  return (
    <>
      <StyledAboutSection id="about" ref={revealContainer}>
        <h2 className="numbered-heading text-white">Acerca de mi</h2>

        <div className="inner">
          <StyledText>
            <div>
              <p className="text-light-slate">Hola! Soy Jhon Sebastian. {'<'}Analista desarrollador{'>'}</p>

              <p>
                Una vez dijo Nikola Tesla: “No hay emoción más intensa para un inventor que ver una
                de sus creaciones funcionando”, y considero que tiene razón. Lograr impactar la vida
                de las personas de una manera positiva con la tecnología es una de las cosas que más
                disfruto de mi trabajo, y las que más ilusión me hacen.
            </p>

              <p>
                Actualmente soy Técnico profesional en Desarrollo de Software, continuo mis estudios para ser tecnólogo en Sistematización de datos, y posteriormente Ingeniero en Sistemas en el{' '}
                <a className="text-green" rel="noopener noreferrer" href="https://www.politecnicojic.edu.co/" target="_blank">Politécnico colombiano Jaime Isaza Cadavid</a>.
            </p>
              <p>
                Me uní como analista desarrollador en <a className="text-green" rel="noopener noreferrer" href="https://www.quipux.com/" target="_blank">Quipux S.A.S</a> donde trabajo en una amplia
                variedad de proyectos internacionales y significativos a diario,
                donde en el proyecto de <a className="text-green" rel="noopener noreferrer" href="https://eservices.cgi.ci/avit/#/public" target="_blank">CGI DIGITAL Côte d’Ivoire</a> desempeño el rol de Lead developer.
            </p>

              <p>Algunas tecnologías con las que he estado trabajando recientemente:</p>
            </div>

            <ul className="skills-list">
              {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
            </ul>
          </StyledText>

          <StyledPic>
            <div className="wrapper">
              <ImageNext
                src="/images/FotoPersonal.webp"
                width="300px"
                height="300px"
                alt="Avatar"
              />
            </div>
          </StyledPic>
        </div>
      </StyledAboutSection>
    </>
  );
};

export default About;