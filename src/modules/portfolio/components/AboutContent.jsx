import useIsMobile from "@modules/shared/hooks/useIsMobile";
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
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const AboutContainer = styled.div`
  flex-flow: column;
  flex: none;
  place-content: center flex-end;
  align-items: center;
  gap: 32px;
  width: 100%;
  height: min-content;
  padding: 0 56px;
  display: flex;
  position: absolute;
  bottom: 56px;
  left: 0;
  overflow: visible;

  @media (max-width: 767.98px) {
    flex-flow: column;
    align-items: flex-start;
    gap: 20px;
    width: 100%;
    max-width: 480px;
    height: min-content;
    padding: 0 24px 40px;
    display: flex;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%);
  }
`;

const AboutHeader = styled.div`
  flex-flow: column;
  flex: none;
  place-content: center;
  align-items: center;
  gap: 0;
  width: min-content;
  height: min-content;
  padding: 0;
  display: flex;
  position: relative;
  overflow: visible;

  @media (max-width: 767.98px) {
    width: 100%;
  }
`;

const AboutDesktop = styled.div`
  display: flex;
  flex-direction: column;
  width: 920px;
  position: relative;
`;

const AboutHeaderMobile = styled.div`
  outline: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-shrink: 0;
  transform: none;
  white-space: pre-wrap;
  word-break: break-word;
  word-wrap: break-word;
  flex: none;
  width: 100%;
  height: auto;
  position: relative;
`;

const AboutH2 = styled.h2`
  font-family: "Roobert Bold", sans-serif;
  font-size: 75px;
  font-weight: 550;
  line-height: 100%;
  text-align: center;
  color: var(--first-color);

  @media (max-width: 767.98px) {
    font-size: 50px;
    font-weight: 600;
    text-align: left !important;
  }
`;

const AboutBody = styled.div`
  will-change: transform;
  opacity: 1;
  transform: none;

  display: flex;
  flex-flow: column;
  flex: none;
  gap: 10px;
  width: 100%;
  height: min-content;
  padding: 0;
  position: relative;
  overflow: visible;

  /* Desktop (default) */
  place-content: flex-start center;
  align-items: flex-start;

  /* Mobile (cuando pasas la prop $isMobile) */
  ${({ $isMobile }) =>
    $isMobile &&
    `
    place-content: center;
    align-items: center;
  `}
`;

const AboutBodyContent = styled.div`
  outline: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-shrink: 0;
  transform: none;

  --framer-paragraph-spacing: 0px;
  opacity: 0.6;
  white-space: pre-wrap;
  word-break: break-word;
  word-wrap: break-word;
  flex: none;
  width: 38%;
  min-width: 520px;
  max-width: 640px;
  height: auto;
  position: relative;

  @media (max-width: 767.98px) {
    will-change: transform;
    width: 100%;
    min-width: unset;
    max-width: 100%;
  }
`;

const AboutBodyParagraph = styled.p`
  font-family: "Roobert Bold", sans-serif;
  font-size: 20px;
  line-height: 140%;

  @media (max-width: 767.98px) {
    text-align: left;
    font-size: 17px;
  }
`;

const AboutH2ParagraphHighlight = styled.span`
  font-family: "Roobert Bold", sans-serif;
  font-size: 45px;
  line-height: 100%;
  text-align: left;
`;

const AboutContent = () => {
  const isMobile = useIsMobile();
  return (
    <AboutWrapper id="about">
      <AboutContainer>
        <AboutHeader className="about__title">
          {isMobile && (
            <AboutHeaderMobile>
              <AboutH2>
                {`I design and build scalable software solutions`
                  .split(" ")
                  .map((word, index) => (
                    <AboutH2ParagraphHighlight
                      key={index}
                      style={{
                        display: "inline",
                        willChange: "transform",
                      }}
                    >
                      {word}{" "}
                    </AboutH2ParagraphHighlight>
                  ))}
              </AboutH2>
            </AboutHeaderMobile>
          )}

          {!isMobile && (
            <>
              <AboutDesktop>
                <AboutH2>I design and</AboutH2>
              </AboutDesktop>
              <AboutDesktop>
                <AboutH2>build scalable software</AboutH2>
              </AboutDesktop>
              <AboutDesktop>
                <AboutH2>solutions</AboutH2>
              </AboutDesktop>
            </>
          )}
        </AboutHeader>

        <AboutBody $isMobile={isMobile}>
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
