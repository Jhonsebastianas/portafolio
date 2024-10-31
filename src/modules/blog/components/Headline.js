import PropTypes from 'prop-types';

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
                <a href={youtubeLink} target="_blank" rel="noopener noreferrer" className="portada__youtube-btn">
                    Ver en YouTube
                </a>
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