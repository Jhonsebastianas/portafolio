import styled, { keyframes, css } from 'styled-components';
import { useState } from 'react';
import useIntersectionObserver from '@hooks/useIntersectionObserver';

/*=============================================
  KEYFRAMES
===============================================*/
const floatUp = keyframes`
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to   { opacity: 1; transform: scale(1); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50%       { transform: scale(1.08); }
`;

const ripple = keyframes`
  0%   { transform: scale(1); opacity: 0.6; }
  100% { transform: scale(2.5); opacity: 0; }
`;



/*=============================================
  STYLED COMPONENTS
===============================================*/
const Section = styled.section`
  padding: 4rem 0 5rem;
  background: var(--body-color);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      hsla(var(--hue-color), 69%, 61%, 0.04) 0%,
      transparent 100%
    );
    pointer-events: none;
  }
`;

const Inner = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const SectionLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  opacity: 0;
  ${({ $visible }) => $visible && css`
    animation: ${floatUp} 0.6s ease forwards;
    animation-delay: 0.05s;
  `}
`;

const LabelLine = styled.div`
  width: 36px;
  height: 3px;
  background: #ff0000;
  border-radius: 2px;
`;

const LabelText = styled.span`
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #ff4444;
`;

const VideoWrapper = styled.div`
  position: relative;
  border-radius: 1.25rem;
  overflow: hidden;
  background: #000;
  aspect-ratio: 16 / 9;
  box-shadow: 0 20px 60px rgba(0,0,0,0.25);
  cursor: pointer;
  opacity: 0;
  ${({ $visible }) => $visible && css`
    animation: ${scaleIn} 0.7s ease forwards;
    animation-delay: 0.15s;
  `}

  /* Borde con glow sutil */
  &::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 1.3rem;
    background: linear-gradient(
      135deg,
      hsla(var(--hue-color), 69%, 61%, 0.3),
      transparent 60%
    );
    pointer-events: none;
    z-index: 1;
  }
`;

const Thumbnail = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease, filter 0.3s ease;

  ${VideoWrapper}:hover & {
    transform: scale(1.03);
    filter: brightness(0.85);
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0,0,0,0.6) 0%,
    rgba(0,0,0,0.1) 50%,
    transparent 100%
  );
  z-index: 2;
`;

const PlayButtonWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlayRipple = styled.div`
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  animation: ${ripple} 2s ease infinite;

  &:nth-child(2) {
    animation-delay: 0.5s;
  }
`;

const PlayButton = styled.button`
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background: rgba(255,255,255,0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s ease;
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  animation: ${pulse} 2s ease infinite;
  backdrop-filter: blur(4px);

  svg {
    width: 28px;
    height: 28px;
    margin-left: 4px; /* Visual center for play triangle */
    color: var(--first-color);
  }

  ${VideoWrapper}:hover & {
    transform: scale(1.1);
    box-shadow: 0 12px 40px rgba(0,0,0,0.4);
  }
`;

const VideoLabel = styled.div`
  position: absolute;
  bottom: 1.25rem;
  left: 1.25rem;
  right: 1.25rem;
  z-index: 3;
`;

const VideoTitle = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  text-shadow: 0 2px 8px rgba(0,0,0,0.5);
  margin-bottom: 0.25rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const YoutubeTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  background: #ff0000;
  color: #fff;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.04em;
`;

const IframeWrapper = styled.div`
  position: absolute;
  inset: 0;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const ChannelCTA = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1.5rem;
  opacity: 0;
  ${({ $visible }) => $visible && css`
    animation: ${floatUp} 0.6s ease forwards;
    animation-delay: 0.35s;
  `}
`;

const ChannelInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const ChannelAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    var(--first-color) 0%,
    hsl(calc(var(--hue-color) + 30), 70%, 55%) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  font-size: 0.9rem;
`;

const ChannelMeta = styled.div`
  p {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--title-color);
    margin-bottom: 0.1rem;
  }
  span {
    font-size: 0.78rem;
    color: var(--text-color-light);
  }
`;

const ChannelLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.4rem;
  border-radius: 50px;
  font-size: 0.88rem;
  font-weight: 600;
  color: #fff;
  background: #ff0000;
  text-decoration: none;
  transition: all 0.25s ease;
  box-shadow: 0 4px 15px rgba(255,0,0,0.3);

  &:hover {
    background: #cc0000;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255,0,0,0.4);
  }
`;

/*=============================================
  COMPONENT
===============================================*/
const YoutubePreview = ({
    videoId = 't-mGJYxtySY',
    channelUrl = 'https://www.youtube.com/@jhonsebastianas',
    videoTitle = '6 Buenas prácticas en desarrollo de software que te harán ser un mejor programador',
    channelName = '@jhonsebastianas'
}) => {
    const [playing, setPlaying] = useState(false);
    const { ref, isVisible } = useIntersectionObserver({ threshold: 0.15 });

    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;

    return (
        <Section ref={ref}>
            <Inner>
                <SectionLabel $visible={isVisible}>
                    <LabelLine />
                    <LabelText>▶ Canal de YouTube</LabelText>
                </SectionLabel>

                <VideoWrapper $visible={isVisible} onClick={() => !playing && setPlaying(true)}>
                    {!playing ? (
                        <>
                            <Thumbnail
                                src={thumbnailUrl}
                                alt={videoTitle}
                                loading="lazy"
                                onError={(e) => {
                                    // Fallback a calidad estándar si maxresdefault no existe
                                    e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                                }}
                            />
                            <Overlay />
                            <PlayButtonWrapper>
                                <PlayRipple />
                                <PlayRipple />
                                <PlayButton aria-label="Reproducir video">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M8 5v14l11-7z"/>
                                    </svg>
                                </PlayButton>
                            </PlayButtonWrapper>
                            <VideoLabel>
                                <YoutubeTag>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.26 8.26 0 0 0 4.84 1.56V6.8a4.85 4.85 0 0 1-1.07-.11z"/>
                                    </svg>
                                    YouTube
                                </YoutubeTag>
                                <VideoTitle>{videoTitle}</VideoTitle>
                            </VideoLabel>
                        </>
                    ) : (
                        <IframeWrapper>
                            <iframe
                                src={embedUrl}
                                title={videoTitle}
                                loading="lazy"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </IframeWrapper>
                    )}
                </VideoWrapper>

                <ChannelCTA $visible={isVisible}>
                    <ChannelInfo>
                        <ChannelAvatar>SA</ChannelAvatar>
                        <ChannelMeta>
                            <p>Sebastian Agudelo</p>
                            <span>{channelName} · Desarrollo de Software</span>
                        </ChannelMeta>
                    </ChannelInfo>
                    <ChannelLink href={channelUrl} target="_blank" rel="noopener noreferrer">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945.266 1.687 1.04 1.938 2.022zM10 15.5l6-3.5-6-3.5v7z"/>
                        </svg>
                        Ver canal completo
                    </ChannelLink>
                </ChannelCTA>
            </Inner>
        </Section>
    );
};

export default YoutubePreview;
