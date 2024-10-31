import { Article } from "@modules/blog/data/articles";
import styled from "styled-components";
import Link from 'next/link';
import PropTypes from 'prop-types';

const Card = styled.div`
  background: var(--container-color);
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const CardImage = styled.img`
  width: 100%;
  height: auto;
`;

const CardContent = styled.div`
  padding: 1rem;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
`;

const CardText = styled.p`
  color: #718096;
`;

const CardLink = styled(Link)`
  color: #5a67d8;
  display: inline-flex;
  align-items: center;
  margin-top: 1rem;
  font-weight: 500;
`;

const Badge = styled.span`
  background: ${({ variant }) => (variant === 'primary' ? '#5a67d8' : '#edf2f7')};
  color: ${({ variant }) => (variant === 'primary' ? 'white' : '#4a5568')};
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
`;

const ArrowRightIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );


const ArticleCard = (props) => {
    const { article } = props;

    const { createdAt, mainImage, mainTheme, title, sortDescription, path } = article;

    return (
        <Card>
            <CardImage src={mainImage} alt="portada snippets" />
            <CardContent>
                <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{mainTheme}</Badge>
                <span className="text-gray-500 text-sm">{createdAt}</span>
                </div>
                <CardTitle>{title}</CardTitle>
                <CardText>
                    {sortDescription}
                </CardText>
                <CardLink href={path}>
                <a>
                    Leer más
                    <ArrowRightIcon className="h-4 w-4" />
                </a>
                </CardLink>
            </CardContent>
        </Card>
    );
}

ArticleCard.propTypes = {
    article: PropTypes.instanceOf(Article),
};

export default ArticleCard;