import styled from "styled-components";

const AboutWrapper = styled.div`
  z-index: 1;
  flex: none;
  width: 100%;
  height: 100vh;
  position: fixed;
  top: calc(50% - 50vh);
  left: 0%;
  overflow: hidden;

  @media (max-width: 767.98px) {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center flex-end;
  align-items: center;
  gap: 32px;
  width: 100%;
  height: min-content;
  padding: 0 56px;
  position: absolute;
  bottom: 56px;
  left: 0;
  overflow: visible;

  @media (max-width: 767.98px) {
    align-items: flex-start;
    gap: 20px;
    max-width: 480px;
    padding: 0 24px 40px;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const AboutHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  width: min-content;
  position: relative;
  overflow: visible;

  opacity: 0;
  visibility: "hidden";

  @media (max-width: 767.98px) {
    width: 100%;
  }
`;

const AboutDesktopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 920px;

  @media (max-width: 767.98px) {
    display: none;
  }
`;

const AboutMobileWrapper = styled.div`
  display: none;

  @media (max-width: 767.98px) {
    display: flex;
    width: 100%;
    flex-direction: column;
  }
`;

const AboutH2 = styled.h2`
  font-family: "Roobert Bold", sans-serif;
  font-size: 75px;
  font-weight: 550;
  line-height: 100%;
  text-align: center;
  color: var(--first-color);
  margin: 0;

  @media (max-width: 767.98px) {
    font-size: 50px;
    font-weight: 600;
    text-align: left;
  }
`;

const AboutH2ParagraphHighlight = styled.span`
  display: inline;
  font-family: "Roobert Bold", sans-serif;
  font-size: 45px;
  line-height: 100%;
  text-align: left;
`;

const AboutBody = styled.div`
  will-change: transform;
  opacity: 1;
  transform: none;

  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  padding: 0;
  position: relative;
  overflow: visible;

  /* mobile default: center */
  place-content: center;
  align-items: center;

  /* desktop: left aligned */
  @media (min-width: 768px) {
    place-content: flex-start center;
    align-items: flex-start;
  }
`;

const AboutBodyContent = styled.div`
  outline: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  opacity: 0.6;
  white-space: pre-wrap;
  word-break: break-word;
  word-wrap: break-word;
  width: 100%;
  max-width: 100%;
  height: auto;
  position: relative;

  opacity: 0;
  visibility: "hidden";

  /* Desktop constraints */
  @media (min-width: 768px) {
    width: 38%;
    min-width: 520px;
    max-width: 640px;
  }
`;

const AboutBodyParagraph = styled.p`
  font-family: "Roobert Bold", sans-serif;
  font-size: 20px;
  line-height: 140%;
  margin: 0;

  @media (max-width: 767.98px) {
    text-align: left;
    font-size: 17px;
  }
`;

const AboutContent = () => {
  return (
    <AboutWrapper id="about">
      <AboutContainer>
        <AboutHeader className="about__title">
          <AboutDesktopWrapper>
            <AboutH2>I design and</AboutH2>
            <AboutH2>build scalable software</AboutH2>
            <AboutH2>solutions</AboutH2>
          </AboutDesktopWrapper>

          <AboutMobileWrapper>
            <AboutH2>
              {`I design and build scalable software solutions`
                .split(" ")
                .map((word, index) => (
                  <AboutH2ParagraphHighlight
                    key={index}
                    style={{
                      willChange: "transform",
                    }}
                  >
                    {word}{" "}
                  </AboutH2ParagraphHighlight>
                ))}
            </AboutH2>
          </AboutMobileWrapper>
        </AboutHeader>

        <AboutBody className="about__body">
          <AboutBodyContent className="about__desc">
            <AboutBodyParagraph>
              Hi, I’m Sebastian Agudelo, a software architect and senior full
              stack developer with a holistic perspective. Throughout my career,
              I’ve partnered with businesses to design and deliver scalable,
              secure, and user-focused systems, creating sustainable value
              through technology. With over 6 years of experience, I bring
              technical leadership, strategic thinking, and industry best
              practices to every project, ensuring quality, efficiency, and
              growth.
            </AboutBodyParagraph>
          </AboutBodyContent>
        </AboutBody>
      </AboutContainer>
    </AboutWrapper>
  );
};

export default AboutContent;
