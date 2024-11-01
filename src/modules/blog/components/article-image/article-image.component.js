import styled from 'styled-components';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ImageContainer = styled.div`
    text-align: center;
    margin-bottom: 1rem;
    aspect-ratio: ${({ ratio }) => ratio || '16 / 9'}; /* Valor por defecto */
    
    img {
        width: 100%;
        padding-top: 2rem;
        padding-left: 2rem;
        padding-right: 2rem;
        height: auto; /* Mantiene la proporción de la imagen */
    }

    span {
        font-size: var(--small-font-size);
    }
`;

// Uso en tu componente
const ArticleImage = (props) => {
    const { src, alt, ratio } = props;
    return (
        <ImageContainer ratio={ratio}>
            <LazyLoadImage
                effect="blur"
                src={src}
                alt={alt}
            />
            <span>{alt}</span>
        </ImageContainer>
    );
};

ArticleImage.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    ratio: PropTypes.oneOf(['16 / 9', '21 / 9', '4 / 3']),
};

export default ArticleImage;