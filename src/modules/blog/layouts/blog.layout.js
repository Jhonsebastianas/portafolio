import styled from "styled-components";
import Header from "../components/menu/menu-blog.component"
import Footer from "./footer-layout";

const MainContainer = styled.main`
    min-height: 65vh;

    @media screen and (min-width: 768px) {
        padding-top: calc(var(--header-height) + 1.5rem);
    }
`;

const BlogLayout = ({ children }) => {
    return (
        <>
            <Header />
            <MainContainer>
                {children}
            </MainContainer>
            <Footer />
        </>
    )
}

export default BlogLayout;