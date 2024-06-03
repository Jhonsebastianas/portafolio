import Header from "../components/menu/menu-blog.component"
import Footer from "./footer-layout";
import SuscribeLayout from "./suscribe-layout";

const BlogLayout = ({ children }) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}

export default BlogLayout;