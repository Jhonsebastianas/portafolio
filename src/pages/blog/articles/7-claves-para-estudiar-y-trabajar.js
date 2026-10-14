import Headline from "@modules/blog/components/Headline";
import ArticleLayout from "@modules/blog/layouts/article-layout";
import BlogLayout from "@modules/blog/layouts/blog.layout";
import PdfDownload from "@modules/blog/components/pdf-download";
import { ArticleHighlight, ArticleList, ArticleListItem } from "@modules/blog/components/article-typography";
import YoutubePreview from "@modules/blog/components/youtube-preview/youtube-preview.component";

const ArticleEstudiarYTrabajar = () => {
    return (
        <BlogLayout>
            <ArticleLayout>
                <Headline
                    key={"Head_EstudiarYTrabajar"}
                    title={"7 claves para estudiar y trabajar"}
                    readingTime={14}
                    date={"Mayo de 2026"}
                    imagePath={"/images/articles/estudiar-y-trabajar/estudiar_trabajar_0_portada.webp"}
                    youtubeLink={"https://www.youtube.com/watch?v=UdLUprTJEtI"}
                />
                <div className="content__info">
                    <PdfDownload
                        title="Descarga la Guía en PDF"
                        description="¡Lleva estas 7 claves siempre contigo! Descarga la guía completa en formato PDF para leerla donde quieras y cuando quieras."
                        fileUrl="/images/articles/estudiar-y-trabajar/Guía para Estudiar y trabajar.pdf"
                        fileName="Guía para Estudiar y Trabajar.pdf"
                    />

                    <h2>Clave 1: El Horario</h2>

                    <ArticleHighlight>
                        LA MAÑANA Y LA NOCHE SERÁN TUS MEJORES ALIADAS.
                        <br /><br />
                        Y las materias virtuales y remotas seran tus mejores amigas.
                    </ArticleHighlight>

                    <p>
                        Algunas universidades te asignan horarios en los primeros semestres,
                        lo que puede ser un problema si choca con tu trabajo. Pero tranquilo,
                        en semestres posteriores tendrás más flexibilidad para elegir clases
                        que se acomoden a tu rutina laboral.
                    </p>

                    <p>Debes evitar en cada semestre escoger materias que:</p>
                    <ArticleList>
                        <ArticleListItem $type="cross">Elegir materias en horarios intermedios. (8-11 a.m. o de 2-5 p.m.)</ArticleListItem>
                        <ArticleListItem $type="cross">Tomar clases remotas (diferente a virtuales) en horario intermedio.</ArticleListItem>
                    </ArticleList>

                    <p>Por el contrario lo que te recomiendo bastantes es:</p>
                    <ArticleList>
                        <ArticleListItem>Prioriza materias en horarios extremos (Muy temprano o muy tarde).</ArticleListItem>
                        <ArticleListItem>Elige las materias virtuales en fin de semana.</ArticleListItem>
                        <ArticleListItem>Tomar clases mediadas por las TIC en horarios extremos o medio día.</ArticleListItem>
                    </ArticleList>

                    <ArticleHighlight>
                        LA CLAVE AQUÍ ES ELEGIR HORARIOS QUE SE ACOMODEN A TU JORNADA LABORAL Y NO INTERFIERAN CON TU TRABAJO.
                    </ArticleHighlight>

                    <h2>Clave 2: Espacio de estudio</h2>
                    <p>
                        Si quieres tomarte en serio estudiar y trabajar, deberás preparar tu propio espacio de estudio. Es el espacio donde obtendrás conocimiento y aportarás tu valor al mundo.
                    </p>
                    <p>Lo más esencial sería:</p>
                    <ArticleList>
                        <ArticleListItem>Una silla cómoda</ArticleListItem>
                        <ArticleListItem>Un escritorio amplio</ArticleListItem>
                        <ArticleListItem>Buena iluminación</ArticleListItem>
                    </ArticleList>

                    <ArticleHighlight>
                        TU ESPACIO DE ESTUDIO NO ES SOLO UN LUGAR, ES UN REFLEJO DE TU MENTE: SI LO LLENAS DE PAZ, EN ÉL FLORECERÁ EL CONOCIMIENTO.
                    </ArticleHighlight>
                    <p>
                        Esto significa que debes enfocar tus esfuerzos en construir un sitio que refleje la mejor versión tuya, que te inspire y que te sientas bien. Necesitarás una buena computadora o portátil que te sirva tanto para investigar como para trabajar.
                    </p>

                    <h2>Clave 3: Anota Fechas Importantes</h2>
                    <ArticleHighlight>
                        ES PRIORIDAD QUE NO SE TE PASE NINGUNA FECHA IMPORTANTE, COMO LA ENTREGA DE UN TRABAJO O EXAMEN FINAL.
                    </ArticleHighlight>
                    <p>
                        A muchos estudiantes los toman por sorpresa los días de exámenes, la entrega de trabajos e incluso pagar la matrícula, todo esto por no tener una estrategia que les recuerde y les informe que estas fechas se aproximan.
                    </p>
                    <p>
                        El mejor momento de anotar las fechas importantes es AHORA. Si sigues posponiéndolo, dentro de unas semanas no recordarás qué día te tocan los exámenes y te tomarán desprevenido.
                    </p>
                    <p>Apóyate en la tecnología para recordar:</p>
                    <ArticleList>
                        <ArticleListItem><strong>Google Calendar</strong>: La más conocida y usada. Ideal para anotar parciales, finales y recordatorios importantes.</ArticleListItem>
                        <ArticleListItem><strong>Timetable</strong> (o apps similares): Permite tener el horario de clase y recordatorio de tareas en la misma aplicación, además del salón y profesor.</ArticleListItem>
                    </ArticleList>
                    <p><em>Recuerda: Crea recordatorios con anticipación para evitar sorpresas.</em></p>

                    <h2>Clave 4: Materias Que Desbloquean Otras</h2>
                    <p>
                        Hay materias que son prerrequisitos de otras. No planificarlas puede significar ver uno o más semestres adicionales.
                    </p>
                    <p>
                        Esta clave puede ahorrarte semestres enteros. Literal. Muchas carreras tienen materias que son requisito para ver otras en el futuro. Si no las tomas a tiempo, te toca esperar, y eso puede significar más tiempo y más dinero.
                    </p>
                    <p>Lo que debes hacer al empezar semestre es:</p>
                    <ArticleList>
                        <ArticleListItem>Pide tu pensum completo en la universidad.</ArticleListItem>
                        <ArticleListItem>Marca las materias que son requisito para otras.</ArticleListItem>
                        <ArticleListItem>Priorízalas en tu horario cada semestre.</ArticleListItem>
                    </ArticleList>
                    <ArticleHighlight>
                        Cada semestre, asegúrate de avanzar en las materias que abren camino. No te pongas a llenar horarios con materias sueltas si puedes meter una de las claves. Esa jugada inteligente te ahorra tiempo y estrés.
                    </ArticleHighlight>

                    <h2>Clave 5: Tu Pasión</h2>
                    <p>
                        No todo es trabajo y estudio. Necesitas equilibrar tu tiempo para evitar la frustración. Un equilibrio adecuado aumenta la motivación y el rendimiento académico.
                    </p>
                    <p>
                        Un estudio en <em>The Journal of Positive Psychology</em> encontró que dedicar tiempo a pasiones personales genera más bienestar y menos ansiedad. Tu pasión no es un lujo, es tu equilibrio.
                    </p>
                    <p>Definitivamente debes evitar:</p>
                    <ArticleList>
                        <ArticleListItem $type="cross">Dejarlo para "cuando puedas" (ese momento no llega solo).</ArticleListItem>
                        <ArticleListItem $type="cross">Verlo como algo secundario (es autocuidado, no ocio).</ArticleListItem>
                        <ArticleListItem $type="cross">Confundir distracción con conexión: entretenerse es fácil, recargarse es otra cosa.</ArticleListItem>
                    </ArticleList>

                    <h2>Clave 6: Una Nota No Te Define</h2>
                    <ArticleHighlight>
                        LAS CALIFICACIONES SON IMPORTANTES, PERO NO DETERMINAN TU ÉXITO.
                    </ArticleHighlight>
                    <p>
                        Hay una idea que debemos romper desde ya: tu valor no está en un número. Una nota es una foto borrosa de un momento puntual, no una película completa de tu esfuerzo.
                    </p>
                    <p>Debes centrarte en los puntos que realmente importan y aumentarán tu valor:</p>
                    <ArticleList>
                        <ArticleListItem>Lo que haces con lo que aprendes.</ArticleListItem>
                        <ArticleListItem>La constancia y disciplina.</ArticleListItem>
                        <ArticleListItem>Cómo te levantas después de fallar.</ArticleListItem>
                    </ArticleList>
                    <p>
                        Las empresas y proyectos del futuro no te preguntarán por tu promedio... te preguntarán por tu capacidad para resolver y mejorar.
                    </p>

                    <h2>Clave 7: Conecta Con Tus Compañeros</h2>
                    <p>
                        Dicen que si quieres llegar rápido, vayas solo, pero si quieres llegar lejos… ve acompañado. El conocimiento crece cuando se comparte, y los sueños se alcanzan más fácil cuando hay quien te acompaña.
                    </p>
                    <p>Haz lo siguiente si aún no tienes compañeros de apoyo:</p>
                    <ArticleList>
                        <ArticleListItem>Únete a grupos de estudio, incluso virtuales.</ArticleListItem>
                        <ArticleListItem>Sé generoso con lo que sabes ("El que enseña aprende dos veces").</ArticleListItem>
                        <ArticleListItem>Mantente en contacto más allá de la clase.</ArticleListItem>
                    </ArticleList>

                    <br />
                    <hr />
                </div>
            </ArticleLayout>
        </BlogLayout>
    );
}

export default ArticleEstudiarYTrabajar;