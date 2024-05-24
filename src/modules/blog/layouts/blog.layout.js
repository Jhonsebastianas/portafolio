import Header from "../components/menu/menu-blog.component"

const BlogLayout = ({ children }) => {
    return (
        <>
            <Header />
            {children}
        </>
    )
}

export default BlogLayout;