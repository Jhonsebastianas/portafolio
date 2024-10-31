import { blogRoutes } from "./routes";

export class Article {
    title;
    description;
    sortDescription;
    highlight; // destacar
    path; // ruta
    createdAt;
    mainImage;
    mainTheme;


    constructor() {
        this.title = "";
        this.description = "";
        this.sortDescription = "";
        this.highlight = false;
        this.path = "";
        this.createdAt = "";
        this.mainImage = "";
        this.mainTheme = "";
    }

    withTitle(title) {
        this.title = title;
        return this;
    }

    withCreatedAt(createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    withDescription(description) {
        this.description = description;
        return this;
    }

    withSortDescription(sortDescription) {
        this.sortDescription = sortDescription;
        return this;
    }

    withHighlight(highlight) {
        this.highlight = highlight;
        return this;
    }

    withMainImage(mainImage) {
        this.mainImage = mainImage;
        return this;
    }

    withMainTheme(mainTheme) {
        this.mainTheme = mainTheme;
        return this;
    }

    withPath(path) {
        this.path = path;
        return this;
    }

    build() {
        return {
            title: this.title,
            createdAt: this.createdAt,
            description: this.description,
            mainImage: this.mainImage,
            mainTheme: this.mainTheme,
            sortDescription: this.sortDescription,
            highlight: this.highlight,
            path: this.path,
        }
    }
}

export const articles = [
    new Article()
        .withTitle("Snippets en JavaScript: optimiza tus tareas repetitivas en VSCode")
        .withCreatedAt("May 15, 2023")
        .withDescription("Los snippets son códigos o textos que guardamos y queremos reutilizar de forma ágil en el futuro, hay diversos fragmentos de código creados por la comunidad que permiten optimizar tus tiempos de desarrollo, uno de los más conocidos son los snippets para React, que solo con poner unas siglas te crea un componente vacío que puedes empezar a modificar. Pero…")
        .withMainImage("/images/articles/snippets/snippets_0_portada.webp")
        .withMainTheme("JavaScript")
        .withSortDescription("Los snippets son códigos o textos que guardamos y queremos reutilizar de forma ágil en ...")
        .withPath(blogRoutes.articles.snippets)
        .build(),

    new Article()
        .withTitle("Los Principios SOLID explicados")
        .withCreatedAt("Oct 31, 2024")
        .withDescription("Si quieres destacar como programador o desarrollador, debes aprender los principios SOLID, te llevaran un paso más adelante para elevar tu nivel, y elevar tu seniority, así que comencemos.")
        .withMainImage("/images/articles/solid/solid_0_portada.webp")
        .withMainTheme("Principios")
        .withSortDescription("Si quieres destacar como programador o desarrollador, debes aprender los principios SOLID, te llevaran un paso más adelante para elevar tu nivel, y elevar tu seniority...")
        .withPath(blogRoutes.articles.solid)
        .withHighlight(true)
        .build(),
]