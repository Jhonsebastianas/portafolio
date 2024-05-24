import BlogLayout from "@modules/blog/layouts/blog.layout";
import { H1Title } from "./home-blog-styles";

const HomeBlogView = () => {
    return (
        <BlogLayout>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <main className="container">
                <div>
                    <H1Title>Como crear un blog bien bueno</H1Title>
                    <img src="not" alt="img_portada" />
                </div>
                <div className="container" markdown="1">
                    #*Titulo*
                    <p>Los ingenieros de software prosperan en la construcción de software innovador y en la búsqueda de soluciones a problemas complejos de programación. Es un trabajo que requiere mucha capacidad intelectual y concentración. Y es competitivo. Los ingenieros siempre están buscando formas de mejorar en lo que hacen y a menudo se encuentran atrapados en el brillo de sus pantallas hasta bien entrada la noche.</p>
                    <h3>Un vistazo al futuro: el internet de las cosas (IOT) en el 2021 para “consumidores inteligentes”</h3>
                    <p>Piensa en la última vez que usaste el transporte público de tu ciudad. ¿Ingresaste por medio de una tarjeta recargable u otro método parecido?, si la respuesta es afirmativa, ya has tenido un acercamiento al internet de las cosas, así no lo creas.</p>
                </div>
            </main>
        </BlogLayout>
    )
}

export default HomeBlogView;