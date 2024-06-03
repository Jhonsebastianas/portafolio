import CodeBlock from "@modules/blog/components/menu/code-block/code-block.component";
import ArticleLayout from "@modules/blog/layouts/article-layout";
import BlogLayout from "@modules/blog/layouts/blog.layout";

const code = `"Filtrar por nombre y edad": {
    "prefix": "filtroNombreEdad",
    "description": "Se filtra una lista de personas por nombre y edad",
    "body": [
    "const nombreFiltrar = '$1'.toLowerCase();",
    "const edadFiltrar = $2;",
    "const nuevaLista = personas",
    "  .filter(persona ={">"} persona.nombre.toLowerCase() == '$1'",
    "          && persona.edad == $2);",
    "",
    "console.log(nuevaLista);",
    ],
}
`;

const ArticleSnippets = () => {
    return (
        <BlogLayout>
            <ArticleLayout>
                <div className="portada">
                    <div className="portada__title">
                        <h1>Snippets en JavaScript: optimiza tus tareas repetitivas en VSCode.</h1>
                        <div className="portada__time">
                            <span>4 min de lectura</span>
                            <span>Julio de 2024</span>
                        </div>
                    </div>
                    <img src="/images/articles/snippets/snippets_0_portada.webp" alt="portada snippets" />
                </div>
                <div className="content__info">
                    <p>A veces, en nuestra vida como profesionales de los medios digitales, nos hemos encontrado con tareas repetitivas y monótonas que son similares o incluso iguales. En ese punto llegamos a pensar… “Ey ¿Será que no puedo mejorar el tiempo que me tardo haciendo esto?. para este tipo de situaciones nos pueden servir los snippets o fragmentos de código.</p>

                    <h2>¿Qué son los snippets?</h2>
                    <p>
                        Los snippets son códigos o textos que guardamos y queremos reutilizar de forma ágil en el futuro, hay diversos fragmentos de código creados por la comunidad que permiten optimizar tus tiempos de desarrollo, uno de los más conocidos son los snippets para React, que solo con poner unas siglas te crea un componente vacío que puedes empezar a modificar. Pero…
                        <strong>¿Cómo se ven los snippets?</strong>
                    </p>
                    <p>Un <strong>ejemplo</strong> de estos puede ser el siguiente:</p>
                    <div className="img__container">
                        <img src="/images/articles/snippets/snippets_1_example.gif" alt="Uso de snippet en VSCode" />
                        <span>Uso de snippet en VSCode</span>
                    </div>
                    <p>El código anterior nos deja una plantilla para ejecutar promesas en Angular.js ¿Asombroso no? solo con escribir unas cuantas palabras tenemos un código completo y funcional. Ahora vamos a ver como crear nuestros propios fragmentos de código.</p>

                    <h2>Como crear un snippet (fragmento de código)</h2>

                    <p>Para crear nuestros snippet, necesitamos tener instalado el VSCode, luego hacemos lo siguiente:</p>

                    <h3>Paso 1: acceder al archivo de snippets personalizados.</h3>
                    <p>Abrimos VSCode, luego de esto se deben seguir los siguientes pasos:</p>

                    <ol>
                        <li>
                            Presionamos las teclas:
                            <br />
                            <strong>Windows:</strong> [ Ctrl ] + [ ↑ | Shift ]+ [ P ]
                            <br />
                            <strong>Mac:</strong> [ ⌘ | command ] + [ ↑ | Shift ] + [ P ]
                        </li>
                        <li>
                            Escribe en el buscador que te aparece:
                            <br />
                            <strong>{">"}Configure User Snippets.</strong>
                        </li>
                        <li>
                            Luego ingresa el lenguaje de programación al cual quieras crearle tus snippets.
                            <br />
                            <strong>Ejemplo:</strong> javascript
                            <br />
                        </li>
                    </ol>
                    <div className="img__container">
                        <img src="/images/articles/snippets/snippets_2_abrir.gif" alt="Abrir configuración de snippets, en el ejemplo javascript" />
                        <span>Abrir archivo para crear snippets VSCode</span>
                    </div>
                    <p>Con estos pasos ya estaremos en el lugar correcto para crear nuestros propios snippets.</p>

                    <h3>Paso 2: Definimos las partes del snippet</h3>
                    <p>Para crear nuestro primer fragmento de código, primero vamos a definir un poco el cuerpo que este lleva:</p>
                    <div className="img__container">
                        <img src="/images/articles/snippets/snippets_3_exampleConsolelog.webp" alt="Ejemplo de creación de snippet en VSCode" />
                        <span>Ejemplo de creación de snippet en VSCode</span>
                    </div>
                    <p>Donde:</p>
                    <ol>
                        <li><strong>"Print to console":</strong> texto que nos dara información sobre lo que hace el snippet</li>
                        <li><strong>"prefix":</strong> Al escribir lo que pongamos aquí, en este caso la palabra “log”, VSCode nos recomendara el uso del snippet</li>
                        <li>
                            <strong>"body":</strong> Aquí va todo el código que queremos reutilizar con el uso de snippets
                            <ul>
                                <li>
                                    <strong>$1:</strong> Es donde se posicionara el Mouse inicialmente para que escribamos un texto, lo que escribamos se repetirá en todos los lugares que utilicemos en este caso el $1
                                </li>
                                <li>
                                    <strong>${"{"}2:texto por defecto{"}"}:</strong> igual que el anterior, salvo que si no escribimos nada, el Snippet utilizará el texto que pongamos entre los dos puntos (:) y la llave de cierre ({"}"}).
                                </li>
                                <li>
                                    <strong>Nota:</strong> Existen n cantidades de las variables: $1, $2, $3… podemos agregar todos los que necesitemos.
                                </li>
                            </ul>
                        </li>
                    </ol>
                    <p>El Snippet anterior es el ejemplo que nos da VSCode para empezar a crear nuestros fragmentos de código.</p>

                    <h3>Paso 3: Creación de nuestro snippet.</h3>
                    <p>Ahora bien, vamos a crear un snippet que nos permita filtrar una lista de personas, por el nombre y por su edad, utilizaremos el siguiente arreglo de objetos:</p>
                    <div className="container__comentario">
                        <p>
                            const personas = [{"{"} nombre: “jhon”, edad: 21 {"}"}, {"{"} nombre: “armando”, edad: 20 {"}"}, {"{"} nombre: “test”, edad: 18 {"}"}]
                        </p>
                    </div>
                    <p>El snippet nos quedaría algo así:</p>
                    <div className="code__container">
                        <CodeBlock code={code} language="jsx" fileName="javascript.json" />
                        <span>Código: snippet filtro nombre y edad</span>
                    </div>
                    <p>El código podría estar más optimizado pero en este caso, se utilizo de esta forma para que se vea como las variables por ejemplo, la $1, al escribirla una vez, se repite en el resto del código que es llamada.</p>
                    <p>Al ejecutar el snippet se vería así:</p>
                    <div className="img__container">
                        <img src="/images/articles/snippets/snippets_4_exampleExecute.gif" alt="Ejemplo de creación de snippet en VSCode" />
                        <span>Ejemplo de creación de snippet en VSCode</span>
                    </div>
                    <p>Ya que hemos visto como crear un snippet, te invito a que empieces a trabajar en los tuyos, sea para proyectos personales, o incluso buscando estandarizar una forma de trabajar, en la empresa que trabajes.</p>
                    <h2>Conclusiones</h2>
                    <p>La creación de snippets nos pueden ayudar a crear nuestros propios “marcos de trabajo”, con código que solemos utilizar y podamos incluso estandarizarlos para una organización/empresa, optimizando la creación de componentes y permitiendo que un equipo siga unos estándares bien definidos y documentados.</p>
                    <div className="container__comentario">
                        <p>
                            Gracias por leer, y no olvides dejar tus aportes en los comentarios 😁.
                            ¡Que la vida los trate bonito!
                        </p>
                    </div>
                </div>
            </ArticleLayout>
        </BlogLayout>
    );
}

export default ArticleSnippets;