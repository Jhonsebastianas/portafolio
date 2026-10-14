import PropTypes from 'prop-types';
import styled from 'styled-components';

const YoutubeBtn = styled.a`
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1.25rem;
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

    svg {
        width: 18px;
        height: 18px;
    }
`;

const Headline = (props) => {
    const { title, readingTime, date, imagePath, youtubeLink } = props;
    return (
        <div className="portada">
            <div className="portada__title">
                <h1>{title}</h1>
                <div className="portada__time">
                    <span>{readingTime} minutos de lectura</span>
                    <span>{date}</span>
                </div>
            </div>
            <img src={imagePath} alt="portada snippets" />
            {youtubeLink && (
                <YoutubeBtn href={youtubeLink} target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945.266 1.687 1.04 1.938 2.022zM10 15.5l6-3.5-6-3.5v7z"/>
                    </svg>
                    Ver en YouTube
                </YoutubeBtn>
            )}
        </div>
    )
}

Headline.propTypes = {
    title: PropTypes.string,
    readingTime: PropTypes.number,
    date: PropTypes.string,
    imagePath: PropTypes.string,
    youtubeLink: PropTypes.string, // Propiedad opcional para el enlace de YouTube
};

export default Headline;