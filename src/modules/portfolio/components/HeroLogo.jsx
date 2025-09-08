import styled from "styled-components";

const HeroLogoWrapper = styled.div`
  align-content: flex-end;
  align-items: flex-end;
  display: flex;
  flex: none;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 0px;
  height: 100vh;
  justify-content: center;
  left: calc(50.00000000000002% - 920px / 2);
  overflow: hidden;
  padding: 0;
  position: fixed;
  top: 0;
  width: 920px;
  z-index: 1;

  @media (max-width: 767.98px) {
    align-content: flex-start;
    align-items: flex-start;
    left: calc(50.00000000000002% - min(440px, max(340px, 80%)) / 2);
    max-width: 440px;
    min-width: 340px;
    order: 5;
    padding: 0 40px;
    width: 80%;
  }
`;

const HeroLogoTop = styled.div`
  flex: none;
  height: 25%;
  overflow: hidden;
  position: relative;
  width: 183px;

  @media (max-width: 767.98px) {
    height: 18%;
  }
`;

const HeroLogoBottom = styled.div`
  flex: none;
  height: 75%;
  overflow: hidden;
  position: relative;
  width: 183px;

  @media (max-width: 767.98px) {
    height: 82%;
  }
`;

const HeroLogoContainer = styled.div`
  flex: none;
  height: 62px;
  position: relative;
  width: 62px;

  @media (max-width: 767.98px) {
    aspect-ratio: 1 / 1;
    height: var(--framer-aspect-ratio-supported, 44px);
    width: 44px;
  }
`;

const HeroLogoIn = styled.div`
  height: 100%;
  width: 100%;
  opacity: 1;
  overflow: visible;
  position: relative;
`;

const HeroLogoLottie = styled.div`
  opacity: 1;
  inset: 0;
  position: absolute;
`;

const HeroLogoImgContent = styled.div`
  height: 100%;
  width: 100%;
`;

const HeroLogo = () => {
  return (
    <HeroLogoWrapper>
      <HeroLogoTop />
      <HeroLogoContainer>
        <HeroLogoIn>
          <HeroLogoLottie>
            <HeroLogoImgContent>
              <img src="/images/logo.svg" />
            </HeroLogoImgContent>
          </HeroLogoLottie>
        </HeroLogoIn>
      </HeroLogoContainer>
      <HeroLogoBottom />
    </HeroLogoWrapper>
  );
};

export default HeroLogo;
