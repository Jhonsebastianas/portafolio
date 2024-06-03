import styled from "styled-components";
import Header from "../components/menu/menu-blog.component"
import Footer from "./footer-layout";

const MainContainer = styled.main`
    min-height: 65vh;
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