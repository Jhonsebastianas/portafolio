import BlogLayout from "@modules/blog/layouts/blog.layout";
import SuscribeLayout from "@modules/blog/layouts/suscribe-layout";
import HomeTest from "./home-test";

const HomeBlogView = () => {
    return (
        <BlogLayout>
            <div className="section">
                <HomeTest />
            </div>
            <div className='container section'></div>
            <SuscribeLayout />
            <div className='container section'></div>
        </BlogLayout>
    )
}

export default HomeBlogView;