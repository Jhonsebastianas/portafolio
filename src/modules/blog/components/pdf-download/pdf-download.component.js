import styled from 'styled-components';

const DownloadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: var(--container-color);
  border-radius: 1rem;
  padding: 1.5rem;
  margin: 2.5rem 0;
  box-shadow: 0 8px 24px hsla(var(--hue-color), 69%, 61%, 0.1);
  border: 1px solid hsla(var(--hue-color), 69%, 61%, 0.15);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 6px;
    height: 100%;
    background: var(--first-color);
  }

  @media screen and (min-width: 568px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 2rem;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 1.5rem;

  @media screen and (min-width: 568px) {
    margin-bottom: 0;
  }
`;

const IconWrapper = styled.div`
  width: 50px;
  height: 50px;
  background: hsla(var(--hue-color), 69%, 61%, 0.1);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 28px;
    height: 28px;
    color: var(--first-color);
  }
`;

const TextContainer = styled.div`
  h4 {
    font-size: 1.1rem;
    margin-bottom: 0.25rem;
    color: var(--title-color);
  }

  p {
    font-size: var(--small-font-size);
    color: var(--text-color-light);
    margin: 0;
  }
`;

const DownloadButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: var(--first-color);
  color: #fff;
  padding: 0.85rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  text-decoration: none;
  transition: .3s;

  &:hover {
    background: var(--first-color-alt);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px hsla(var(--hue-color), 69%, 61%, 0.3);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const PdfDownload = ({ title, description, fileUrl, fileName }) => {
  return (
    <DownloadWrapper>
      <InfoContainer>
        <IconWrapper>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        </IconWrapper>
        <TextContainer>
          <h4>{title}</h4>
          <p>{description}</p>
        </TextContainer>
      </InfoContainer>
      <DownloadButton href={fileUrl} download={fileName} target="_blank" rel="noopener noreferrer">
        Descargar
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
      </DownloadButton>
    </DownloadWrapper>
  );
};

export default PdfDownload;
