import useIsMobile from "@modules/shared/hooks/useIsMobile";
import styled from "styled-components";

const HeroTextWrapper = styled.div`
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 36px;
  width: min-content;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);

  @media (max-width: 767.98px) {
    max-width: 600px;
    width: 100%;
    height: auto;
    bottom: 0;
    top: unset;
    align-items: flex-start;
    justify-content: flex-end;
    gap: 24px;
    padding: 0 24px 28px;
  }
`;

const HeroTextTop = styled.div`
  width: 183px;
  height: 60%;
  position: relative;
  overflow: hidden;
`;

const HeroTextBottom = styled.div`
  width: 183px;
  height: 40%;
  position: relative;
  overflow: hidden;
`;

const HeroTextContainerH1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;

  @media (max-width: 767.98px) {
    align-items: flex-start;
    width: 100%;
  }
`;

const HeroTextContainerDesktop = styled.div`
  display: flex;
  flex-direction: column;
  width: 920px;
  position: relative;

  @media (max-width: 767.98px) {
    width: 342px;
  }
`;

const HeroTextContainerDesktopH1 = styled.h1`
  font-family: "Roobert Bold", sans-serif;
  font-size: 90px;
  font-weight: 550;
  line-height: 100%;
  text-align: center;
  color: var(--first-color);

  @media (max-width: 767.98px) {
    font-size: 50px;
    font-weight: 600;
    text-align: left;
  }
`;

const HeroValueProps = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 60px;
  width: min-content;

  @media (max-width: 767.98px) {
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 12px;
    width: 340px;
  }
`;

const HeroValuePropsItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  @media (max-width: 767.98px) {
    align-items: flex-start;
    gap: 2px;
    width: 160px;
  }
`;

const HeroValuePropsItemTopP = styled.p`
  font-family: "Roobert SemiBold", sans-serif;
  font-size: 40px;
  color: var(--first-color);

  @media (max-width: 767.98px) {
    font-size: 28px;
    line-height: 120%;
  }
`;

const HeroValuePropsItemBottomP = styled.p`
  font-family: "Roobert Regular", sans-serif;
  font-size: 12px;
  line-height: 140%;
  text-align: center;
  color: var(--first-color);

  @media (max-width: 767.98px) {
    text-align: left;
  }
`;

const HeroText = () => {
  const isMobile = useIsMobile();
  return (
    <HeroTextWrapper>
      <HeroTextTop />
      <HeroTextContainerH1>
        <HeroTextContainerDesktop className="hero__title hero__title-fade">
          <HeroTextContainerDesktopH1>
            Software architect &
          </HeroTextContainerDesktopH1>
          <HeroTextContainerDesktopH1>
            senior developer
          </HeroTextContainerDesktopH1>
        </HeroTextContainerDesktop>
      </HeroTextContainerH1>
      <HeroValueProps>
        <HeroValuePropsItem className="hero_subtitles hero__subtitle-fade">
          <HeroValuePropsItemTopP>Java</HeroValuePropsItemTopP>
          <HeroValuePropsItemBottomP>
            In-depth knowledge
          </HeroValuePropsItemBottomP>
        </HeroValuePropsItem>
        <HeroValuePropsItem className="hero_subtitles hero__subtitle-fade">
          <HeroValuePropsItemTopP>+6</HeroValuePropsItemTopP>
          <HeroValuePropsItemBottomP>
            Years of experience
          </HeroValuePropsItemBottomP>
        </HeroValuePropsItem>
        <HeroValuePropsItem className="hero_subtitles hero__subtitle-fade">
          <HeroValuePropsItemTopP>10+</HeroValuePropsItemTopP>
          <HeroValuePropsItemBottomP>
            Completed project
          </HeroValuePropsItemBottomP>
        </HeroValuePropsItem>
      </HeroValueProps>
      <HeroTextBottom />
    </HeroTextWrapper>
  );
};

export default HeroText;
