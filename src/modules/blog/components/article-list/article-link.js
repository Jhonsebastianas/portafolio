import Link from "next/link";
import styled from "styled-components";

const ArticleText = styled.div`

    margin-top: 1rem;

    a {
        text-decoration: underline;
    }
`;

const ArticleLink = (props) => {
    const { href, children } = props;

    return (
        <ArticleText>
            <Link href={href}>
                <a>{children}</a>
            </Link>
        </ArticleText>
    );
}

export default ArticleLink;