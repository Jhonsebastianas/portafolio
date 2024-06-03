import Footer from "@components/layouts/Footer";
import Header from "../components/menu/menu-blog.component"
import SuscribeLayout from "./suscribe-layout";

const BlogLayout = ({ children }) => {
    return (
        <>
            <Header />
            {children}
            {/* <Footer /> */}
        </>
    )
}

export default BlogLayout;