import UlDot from "@components/commons/ul-dot";
import Headline from "@modules/blog/components/Headline";
import CodeBlock from "@modules/blog/components/menu/code-block/code-block.component";
import ArticleLayout from "@modules/blog/layouts/article-layout";
import BlogLayout from "@modules/blog/layouts/blog.layout";
import { LazyLoadImage } from "react-lazy-load-image-component";

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

const codeS = `package co.com.sebastianagudelo.solid.s

// Clase que representa un modelo de reserva
public class ReservationModel {
    private int id;
    private String customerName;

    // Constructor de la clase que inicializa el ID y el nombre del cliente
    public ReservationModel(int id, String customerName) {
        this.id = id;
        this.customerName = customerName;
    }

    // Métodos getter
    public int getId() {
        return id;
    }

    public String getCustomerName() {
        return customerName;
    }
}

// Servicio para gestionar operaciones sobre reservas
public class ReservationService {
    // Método que busca una reserva existente y devuelve un modelo de reserva
    public ReservationModel findExistingReservation(int id) {
        System.out.println("Finding reservation with ID: " + id);
        return new ReservationModel(id, "John Doe"); // Simulación de búsqueda de reserva
    }
}

// Servicio que gestiona la generación de facturas para las reservas
public class InvoiceService {
    // Método que genera una factura para la reserva especificada
    public void generateInvoice(ReservationModel reservation) {
        System.out.println("Generating invoice for reservation ID: " + reservation.getId());
    }
}

// Servicio que gestiona el envío de correos para las reservas
public class EmailService {
    // Método que envía un correo de confirmación para la reserva especificada
    public void sendReservationEmail(ReservationModel reservation) {
        System.out.println("Sending email for reservation ID: " + reservation.getId());
    }
}

// Clase Facade que simplifica el uso de los servicios de reservas, facturación y correo
public class ReservationFacade {
    private ReservationService reservationService; // Servicio de reservas
    private InvoiceService invoiceService; // Servicio de facturación
    private EmailService emailService; // Servicio de correo

    // Constructor que inicializa los servicios
    public ReservationFacade() {
        this.reservationService = new ReservationService();
        this.invoiceService = new InvoiceService();
        this.emailService = new EmailService();
    }

    // Método que encuentra una reserva existente
    public ReservationModel findExistingReservation(int id) {
        return reservationService.findExistingReservation(id);
    }

    // Método que genera la factura de una reserva existente
    public void generateInvoice(int reservationId) {
        ReservationModel reservation = reservationService.findExistingReservation(reservationId);
        invoiceService.generateInvoice(reservation);
    }

    // Método que envía un correo de confirmación para una reserva existente
    public void sendReservationEmail(int reservationId) {
        ReservationModel reservation = reservationService.findExistingReservation(reservationId);
        emailService.sendReservationEmail(reservation);
    }
}

// Clase principal que utiliza el Facade para simplificar el uso de los servicios
public class Main {
    public static void main(String[] args) {
        ReservationFacade facade = new ReservationFacade();

        int reservationId = 1; // ID de ejemplo para la reserva
        facade.generateInvoice(reservationId); // Genera la factura
        facade.sendReservationEmail(reservationId); // Envía el correo de confirmación
    }
}
`;

const codeO = `package co.com.sebastianagudelo.solid.o

// Clase base abstracta que representa un personaje con acciones comunes
public abstract class Character {
    // Método para atacar
    public void attack() {
        System.out.println("Character attacks!");
    }

    // Método para defender
    public void defend() {
        System.out.println("Character defends!");
    }

    // Método para moverse
    public void move() {
        System.out.println("Character moves!");
    }
}

// Subclase que representa un dragón, que hereda las acciones comunes de Character
public class Dragon extends Character {
    // Método específico para el dragón que le permite volar
    public void fly() {
        System.out.println("Dragon flies!");
    }
}

// Subclase que representa un mago, que hereda las acciones comunes de Character
public class Wizard extends Character {
    // Método específico para el mago que le permite lanzar hechizos
    public void castSpell() {
        System.out.println("Wizard casts a spell!");
    }
}

// Subclase que representa un espadachín, que hereda las acciones comunes de Character  
public class SwordsMan extends Character {
    // Método específico para el espadachín que le permite usar dos espadas
    public void useTwoSwords() {
        System.out.println("Swords Man uses two swords!");
    }
}

// Clase principal para demostrar el uso de diferentes personajes
public class Main {
    public static void main(String[] args) {
        // Crear un personaje de tipo Dragon y realizar acciones específicas
        Character dragon = new Dragon();
        dragon.attack(); // Acción común de atacar
        ((Dragon) dragon).fly(); // Acción específica de volar del dragón

        // Crear un personaje de tipo Wizard y realizar acciones específicas
        Character wizard = new Wizard();
        wizard.defend(); // Acción común de defender
        ((Wizard) wizard).castSpell(); // Acción específica de lanzar hechizos del mago

        // Crear un personaje de tipo SwordsMan y realizar acciones específicas
        Character swordsMan = new SwordsMan();
        swordsMan.move(); // Acción común de moverse
        ((SwordsMan) swordsMan).useTwoSwords(); // Acción específica de usar dos espadas del espadachín
    }
}
`;

const codeL = `package co.com.sebastianagudelo.solid.l

// Clase base que representa un vehículo
abstract class Vehicle {
    // Método que indica que el vehículo puede moverse
    public void move() {
        System.out.println("Can move");
    }
}

// Subclase para vehículos con motor
class EngineVehicle extends Vehicle {
    // Método que permite arrancar el motor del vehículo
    public void startEngine() {
        System.out.println("Can start engine");
    }
}

// Subclase para vehículos voladores
class FlyingVehicle extends EngineVehicle {
    // Método que permite que el vehículo vuele
    public void fly() {
        System.out.println("Can fly");
    }
}

// Clase para bicicleta (no tiene motor ni puede volar)
class Bicycle extends Vehicle {
    // No necesita métodos adicionales; usa el método move() de Vehicle
}

// Clase para carro (tiene motor pero no puede volar)
class Car extends EngineVehicle {
    // Usa el método startEngine() de EngineVehicle
}

// Clase para avión (tiene motor y puede volar)
class Airplane extends FlyingVehicle {
    // Usa los métodos startEngine() y fly() de FlyingVehicle
}

// Ejemplo de uso: clase principal que muestra el uso de diferentes tipos de vehículos
public class Main {
    public static void main(String[] args) {
        Bicycle bike = new Bicycle();
        bike.move(); // La bicicleta puede moverse

        Car car = new Car();
        car.move(); // El carro puede moverse
        car.startEngine(); // El carro puede arrancar el motor

        Airplane plane = new Airplane();
        plane.move(); // El avión puede moverse
        plane.startEngine(); // El avión puede arrancar el motor
        plane.fly(); // El avión puede volar
    }
}
`;

const codeI = `package co.com.sebastianagudelo.solid.i

// Clase base
abstract class Vehicle {
    public void move() {
        System.out.println("Can move");
    }
}

// Interface para vehículos con motor
interface EngineVehicle {
    void startEngine();
}

// Interface para transformación
interface Transformable {
    void transform();
}

// Interface para combate
interface Warrior {
    void attack();
}

// Subclase para vehículos voladores
class FlyingVehicle extends Vehicle {
    public void fly() {
        System.out.println("Can fly");
    }
}

// Clase para Autobot, que implementa EngineVehicle, Transformable, y Warrior
class Autobot extends Vehicle implements EngineVehicle, Transformable, Warrior {
    @Override
    public void startEngine() {
        System.out.println("Autobot can start engine");
    }

    @Override
    public void transform() {
        System.out.println("Autobot can transform");
    }

    @Override
    public void attack() {
        System.out.println("Autobot can attack");
    }
}

// Clase para Decepticon, que implementa EngineVehicle, Transformable, y Warrior, y puede volar
class Decepticon extends FlyingVehicle implements EngineVehicle, Transformable, Warrior {
    @Override
    public void startEngine() {
        System.out.println("Decepticon can start engine");
    }

    @Override
    public void transform() {
        System.out.println("Decepticon can transform");
    }

    @Override
    public void attack() {
        System.out.println("Decepticon can attack");
    }
}

// Ejemplo de uso
public class Main {
    public static void main(String[] args) {
        Autobot autobot = new Autobot();
        autobot.move();
        autobot.startEngine();
        autobot.transform();
        autobot.attack();

        Decepticon decepticon = new Decepticon();
        decepticon.move();
        decepticon.startEngine();
        decepticon.transform();
        decepticon.attack();
        decepticon.fly();
    }
}
`;

const codeD = `package co.com.sebastianagudelo.solid.d

// Servicio de pago abstracto
abstract class AbstractPaymentService {
    public abstract void processPayment(double amount);
}

// Implementación del servicio de pago con tarjeta de crédito
class CreditCardPaymentService extends AbstractPaymentService {
    @Override
    public void processPayment(double amount) {
        System.out.println("Processing credit card payment of $" + amount);
    }
}

// Servicio de checkout que utiliza el servicio de pago
class CheckoutService {
    private AbstractPaymentService paymentService;

    public CheckoutService(AbstractPaymentService paymentService) {
        this.paymentService = paymentService;
    }

    public void checkout(double amount) {
        System.out.println("Initiating checkout for amount $" + amount);
        paymentService.processPayment(amount);
    }
}

// Ejemplo de uso
public class Main {
    public static void main(String[] args) {
        AbstractPaymentService paymentService = new CreditCardPaymentService();
        CheckoutService checkoutService = new CheckoutService(paymentService);

        checkoutService.checkout(100.0);
    }
}
`;

const ArticleSOLID = () => {
  return (
    <BlogLayout>
      <ArticleLayout>
        <Headline
          key={"Head_SOLID"}
          title={"Los Principios SOLID explicados"}
          readingTime={14}
          date={"Octubre de 2024"}
          imagePath={"/images/articles/solid/solid_0_portada.webp"}
          youtubeLink={"https://www.youtube.com/watch?v=UdLUprTJEtI"}
        />
        <div className="content__info">
          <p>
            Imagina que has trabajado semanas, incluso meses, en un proyecto de
            software. Todo parece ir bien hasta que, un día, un pequeño cambio
            en una función rompe todo el sistema. El código es tan frágil que
            con cada modificación, nuevas fallas emergen. ¿Te suena familiar?
          </p>
          <p>
            En el mundo del desarrollo de software, todos hemos estado allí.
            Pero ¿y si te dijera que hay un conjunto de principios que actúan
            como una armadura, protegiendo tu código de este caos? Aquí es donde
            entran en juego los principios SOLID.
          </p>
          <p>
            Si quieres destacar como programador o desarrollador, debes aprender
            los principios SOLID, te llevaran un paso más adelante para elevar
            tu nivel, y elevar tu seniority, así que comencemos.
          </p>

          <h2>¿Qué son los principios SOLID?</h2>
          <p>
            SOLID es un acrónimo que representa cinco principios esenciales para
            escribir código limpio, flexible y fácil de mantener. Estos
            principios son como los pilares que sostienen una arquitectura
            sólida, asegurando que el código pueda evolucionar sin colapsar bajo
            su propio peso. Y estos fueron creados por Robert C. Martin.
          </p>
          <p>
            Cada letra del acrónimo SOLID significa un principio, y estos son:
          </p>
          <UlDot>
            <li>
              La S es para Single responsability, principio de responsabilidad
              única, ya los definiremos cada uno al detalle más adelante
            </li>
            <li>La O es Open-Closed, o principio de apertura y cierre</li>
            <li>
              La L Liskov substitution o principio de sustitución de Liskov
            </li>
            <li>
              La I interface segregation, o el principio de segregación de
              interfaces.
            </li>
            <li>
              Y por último la D que es Dependency inversion, o el principio de
              inversión de dependencias.
            </li>
          </UlDot>

          <p>
            Donde La intención de estos principios es establecer practicas que
            ayuden a los desarrolladores a crear software altamente adaptable,
            escalable y comprensible, al tiempo que se evitan muchos problemas o
            errores.
          </p>
          <p>
            Vamos a explicar cada principio y luego con su respectivo ejemplo
            para que puedas interiorizarlo y aplicarlo a tus proyectos.
          </p>

          <h2>El Viaje del Héroe – Implementando los Principios SOLID </h2>

          <h3>Single responsability (S)</h3>
          <p>
            Imagina que estás construyendo una casa. ¿Pondrías a un solo
            trabajador a encargarse de toda la construcción, desde la
            electricidad hasta la fontanería? Seguramente no. Cada especialista
            tiene una función específica.
          </p>
          <p>
            El principio de responsabilidad única establece que cada clase debe
            tener una única razón para cambiar. Cada módulo de código debe hacer
            solo una cosa, pero hacerlo bien. Así como un electricista se
            encarga solo de la electricidad, una clase debe encargarse de una
            única tarea.
          </p>
          <p>
            <strong>Puntos clave: </strong>
          </p>
          <UlDot>
            <li>Modularizar más el código</li>
            <li>Hacer el código más reusable</li>
            <li>Separación de intereses</li>
            <li>Evitar las clases de Dios</li>
          </UlDot>
          <p>
            <strong>Diagrama UML:</strong>
          </p>
          <div className="img__container">
            <LazyLoadImage
                effect="blur"
                src="/images/articles/solid/solid_1_s.png"
                alt="Figura 1: Reservation Service. Single responsability"
            />
            <span>Figura 1: Reservation Service. Single responsability</span>
          </div>
          <p>
            <strong>Código de implementación correcta:</strong>
          </p>
          <div className="code__container">
            <CodeBlock
              code={codeS}
              language="jsx"
              fileName="reservation.java"
            />
            <span>Código 1: Reservation Service. Single responsability</span>
          </div>
        </div>

        <h3>Open-closed (O)</h3>
        <p>
          Ahora que ya tienes a tus especialistas, ¿qué pasaría si un día
          decides que quieres agregar una piscina? No derrumbarías toda la casa,
          ¿cierto? Simplemente añadirías la piscina sin alterar lo que ya
          funciona.
        </p>
        <p>
          El principio de abierto/cerrado nos dice que nuestras clases deben
          estar abiertas para la extensión, pero cerradas para la modificación.
          Es decir, podemos agregar nuevas funcionalidades sin tener que cambiar
          el código existente. Esto protege el código de futuras roturas.
        </p>
        <p>
          <strong>Puntos clave: </strong>
        </p>
        <UlDot>
          <li>Código extensible</li>
          <li>Evite modificar el código para casos específicos</li>
          <li>Evite cambiar el comportamiento original del código</li>
          <li>Polimorfismo</li>
        </UlDot>
        <p>
          <strong>Diagrama UML:</strong>
        </p>
        <div className="img__container">
            <LazyLoadImage
                effect="blur"
                src="/images/articles/solid/solid_2_o.png"
                alt="Figura 2: Videogame. Open-Close"
            />
          <span>Figura 2: Videogame. Open-Close</span>
        </div>
        <p>
          <strong>Código de implementación correcta:</strong>
        </p>
        <div className="code__container">
          <CodeBlock code={codeO} language="java" fileName="videogame.java" />
          <span>Código 2: Videogame. Open-Close</span>
        </div>

        <h3>Liskov substitution (L)</h3>
        <p>
          En esta etapa del viaje, imagina que necesitas reemplazar a un
          trabajador por otro. Esperarías que el nuevo trabajador pueda
          desempeñar la misma función sin problemas, ¿verdad?
        </p>
        <p>
          El principio de sustitución de Liskov establece que las clases
          derivadas deben poder reemplazar a sus clases base sin alterar el
          funcionamiento del programa. Esto asegura que las jerarquías de
          herencia funcionen de manera coherente.
        </p>
        <p>
          <strong>Puntos clave: </strong>
        </p>
        <UlDot>
          <li>Abstracción</li>
          <li>Contratos o interfaces</li>
          <li>Identificar comportamientos comunes</li>
        </UlDot>
        <p>
          <strong>Diagrama UML:</strong>
        </p>
        <div className="img__container">
            <LazyLoadImage
                effect="blur"
                src="/images/articles/solid/solid_3_l.png"
                alt="Figura 3: Vehicles. Liskov substitution"
            />
          <span>Figura 3: Vehicles. Liskov substitution</span>
        </div>
        <p>
          <strong>Código de implementación correcta:</strong>
        </p>
        <div className="code__container">
          <CodeBlock code={codeL} language="java" fileName="vehicles.java" />
          <span>Código 3: Vehicles, Liskov substitution</span>
        </div>

        <h3>Interface segregation (I)</h3>
        <p>
          Aquí, tenemos otra lección importante: no sobrecargues a tus
          trabajadores con tareas innecesarias. Si un trabajador solo necesita
          una herramienta específica para hacer su trabajo, ¿por qué forzarle a
          cargar con un maletín completo de herramientas que no va a usar?
        </p>
        <p>
          Este principio dice que no debemos forzar a los clientes a depender de
          interfaces que no usan. Cada interfaz debe ser específica para el
          propósito que necesita cumplir, lo que hace que el código sea más
          limpio y manejable.
        </p>

        <p>
          <strong>Puntos clave: </strong>
        </p>
        <UlDot>
          <li>Definir interfaces pequeñas</li>
          <li>Implementar solo las interfaces solicitadas</li>
          <li>Identificar grupos con métodos comunes</li>
        </UlDot>
        <p>
          <strong>Diagrama UML:</strong>
        </p>
        <div className="img__container">
            <LazyLoadImage
                effect="blur"
                src="/images/articles/solid/solid_4_i.png"
                alt="Figura 4: Robots. Interface segregation"
            />
          <span>Figura 4: Robots. Interface segregation</span>
        </div>
        <p>
          <strong>Código de implementación correcta:</strong>
        </p>
        <div className="code__container">
          <CodeBlock code={codeI} language="java" fileName="robots.java" />
          <span>Código 4: Robots, Interface segregation</span>
        </div>

        <h3>Dependency inversion (D)</h3>
        <p>
          Finalmente, llega la parte clave: ¿a quién le das las instrucciones en
          una obra? No se las das a los martillos o a las herramientas, sino a
          los capataces. De la misma manera, en el código, las clases de alto
          nivel no deben depender de los detalles. Ambas deben depender de
          abstracciones.
        </p>
        <p>
          Este principio nos enseña a invertir las dependencias: el código debe
          depender de interfaces o abstracciones, no de implementaciones
          concretas. Esto asegura que el código sea más flexible y fácil de
          modificar en el futuro.
        </p>
        <p>
          <strong>Puntos clave: </strong>
        </p>
        <UlDot>
          <li>Desacoplamiento</li>
          <li>Interfaces y clases abstractas</li>
          <li>Inyección de dependencia o ubicación de servicio</li>
        </UlDot>
        <p>
          <strong>Diagrama UML:</strong>
        </p>
        <div className="img__container">
            <LazyLoadImage
                effect="blur"
                src="/images/articles/solid/solid_5_d.png"
                alt="Figura 5: CheckoutService. Dependency inversion"
            />
          <span>Figura 5: CheckoutService. Dependency inversion</span>
        </div>
        <p>
          <strong>Código de implementación correcta:</strong>
        </p>
        <div className="code__container">
          <CodeBlock
            code={codeD}
            language="java"
            fileName="CheckoutService.java"
          />
          <span>Código 5: CheckoutService. Dependency inversion</span>
        </div>

        <h2>El Triunfo – ¿Por qué SOLID es Importante?</h2>
        <p>
          SOLID te da las herramientas para escribir código limpio, flexible y
          fácil de mantener. Evita que caigas en la trampa del código espagueti
          y te asegura que tu software pueda crecer y evolucionar sin colapsar.
        </p>
        <p>Además te facilita los siguientes puntos:</p>
        <UlDot>
          <li>Mantenibilidad</li>
          <li>Legibilidad del código</li>
          <li>IFacil de probar</li>
          <li>Reusable</li>
          <li>Escalable</li>
        </UlDot>

        <p>
          En definitiva, los principios SOLID son como un conjunto de reglas que
          mantienen a tu código en forma, preparándolo para cualquier desafío
          que venga.
        </p>

        <h2>Cierre – El Futuro del Héroe</h2>
        <p>
          A medida que el software sigue evolucionando, las herramientas que
          usamos también lo harán. Pero los principios fundamentales como SOLID
          siempre estarán ahí, listos para guiarte en la creación de código
          robusto y duradero.
        </p>
        <p>
          Así que, la próxima vez que empieces un proyecto, pregúntate: ¿está mi
          código siguiendo los principios SOLID? Si lo está, estás en el camino
          correcto.
        </p>
        <p>
          Recuerda suscribirte, y darle a like si te ha gustado el contenido, y
          comparte para que más desarrolladores eleven su seniority.
        </p>

        <p>
          Recuerden, todo lo que hagan, haganlo con pasión y amor con pasión y
          amor. Muchas gracias
        </p>
      </ArticleLayout>
    </BlogLayout>
  );
};

export default ArticleSOLID;
