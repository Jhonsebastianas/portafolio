import ArticleLink from "@modules/blog/components/article-list/article-link";
import BlogLayout from "@modules/blog/layouts/blog.layout";

const ArticlesBlogView = () => {
    return (
        <BlogLayout>
            <section className="section container">
                <h1>Articulos</h1>
                <p>Ensayos y tutoriales, principalmente sobre software, ingeniería y liderazgo.</p>

                <ArticleLink href={"/blog/articles/snippets-en-javaScript-optimiza-tus-tareas-repetitivas-en-vscode"}>
                    Snippets en JavaScript: optimiza tus tareas repetitivas en VSCode.
                </ArticleLink>
            </section>
        </BlogLayout>
    )
}


export default ArticlesBlogView;