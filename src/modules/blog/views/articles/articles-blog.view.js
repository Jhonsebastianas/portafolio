import ArticleLink from "@modules/blog/components/article-list/article-link";
import { articles } from "@modules/blog/data/articles";
import BlogLayout from "@modules/blog/layouts/blog.layout";

const ArticlesBlogView = () => {
    articles
    return (
        <BlogLayout>
            <section className="section container">
                <h1>Articulos</h1>
                <p>Ensayos y tutoriales, principalmente sobre software, ingeniería y liderazgo.</p>
                {
                    articles.map((article) => {
                        const { title, highlight, path } = article;
                        return (
                            <ArticleLink href={path}>
                                {highlight && "⭐ "}{ title }
                            </ArticleLink>
                        )
                    })
                }
            </section>
        </BlogLayout>
    )
}


export default ArticlesBlogView;