import styled from "styled-components";

const HeroPhotoWrapper = styled.div`
  will-change: transform;
  opacity: 1;
  transform: translateX(-50%);

  aspect-ratio: 1 / 1;
  flex: none;
  height: 100vh;
  left: 50%;
  overflow: visible;
  position: fixed;
  top: 0;
  transform: translate(-50%);
  width: var(--framer-aspect-ratio-supported, 800px);
  will-change: var(--framer-will-change-effect-override, transform);
  z-index: 0;

  @media (max-width: 767.98px) {
    height: 90vh;
    order: 8;
    width: var(--framer-aspect-ratio-supported, 760px);
  }

  @media (min-width: 768px) and (max-width: 1199.98px) {
    width: var(--framer-aspect-ratio-supported, 1080px);
  }
`;

const HeroPhotoBackground = styled.div`
  position: absolute;
  border-radius: inherit;
  inset: 0px;
`;

const HeroPhotoImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  object-position: center center;
  object-fit: cover;
`;

const HeroPhoto = () => {
  return (
    <HeroPhotoWrapper className="hero__photo">
      <HeroPhotoBackground>
        <HeroPhotoImage src="/images/perfil_2.png" />
      </HeroPhotoBackground>
    </HeroPhotoWrapper>
  );
};

export default HeroPhoto;
