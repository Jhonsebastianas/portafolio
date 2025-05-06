import styled from "styled-components";

const PrivacyPolicy = () => {
  return (
    <Wrapper>
      <Content>
        <Title>Política de Privacidad</Title>

        <Paragraph>
          En este sitio web (en adelante, “el Sitio”), nos comprometemos a
          proteger la privacidad y los datos personales de nuestros usuarios,
          clientes y colaboradores. Al proporcionar tus datos personales
          (nombre, correo electrónico y número de celular), aceptas esta
          Política de Privacidad y das tu consentimiento informado para el
          tratamiento de tus datos conforme a los términos que se exponen a
          continuación.
        </Paragraph>

        <SectionTitle>1. Responsable del tratamiento de los datos</SectionTitle>
        <Paragraph>
          El responsable del tratamiento de los datos personales facilitados por
          los usuarios es <strong>el Sitio</strong>, con los siguientes datos de
          contacto:
        </Paragraph>
        <List>
          <li>Sebastian Agudelo</li>
          <li>Correo electrónico de contacto: jhonsebastianas@gmail.com</li>
        </List>

        <SectionTitle>2. Datos personales que recopilamos</SectionTitle>
        <Paragraph>
          Podemos recopilar las siguientes categorías de datos personales:
        </Paragraph>
        <List>
          <li>
            Datos de identificación (nombre, apellidos, documento de identidad).
          </li>
          <li>
            Datos de contacto (correo electrónico, dirección, número de
            teléfono).
          </li>
          <li>Información de pago (datos bancarios o de tarjeta).</li>
          <li>
            Información sobre navegación y uso de nuestro sitio web (cookies,
            dirección IP, historial de navegación).
          </li>
        </List>

        <SectionTitle>3. Finalidad del tratamiento de los datos</SectionTitle>
        <Paragraph>
          Los datos personales que tratamos pueden ser utilizados para los
          siguientes fines:
        </Paragraph>
        <List>
          <li>Prestación de los servicios contratados.</li>
          <li>Gestión administrativa y facturación.</li>
          <li>
            Envío de comunicaciones comerciales, previo consentimiento del
            usuario.
          </li>
          <li>
            Mejora de la experiencia del usuario en nuestra página web mediante
            análisis de datos de navegación.
          </li>
          <li>Cumplimiento de obligaciones legales.</li>
        </List>

        <SectionTitle>4. Base jurídica para el tratamiento</SectionTitle>
        <Paragraph>
          Tratamos los datos personales de nuestros usuarios de acuerdo con las
          siguientes bases jurídicas:
        </Paragraph>
        <List>
          <li>Ejecución de un contrato.</li>
          <li>Cumplimiento de obligaciones legales.</li>
          <li>
            Consentimiento explícito del usuario para fines específicos, como el
            envío de comunicaciones comerciales.
          </li>
          <li>
            Interés legítimo de la Empresa para mejorar nuestros productos y
            servicios.
          </li>
        </List>
        <SectionTitle>5. Destinatarios de los datos</SectionTitle>
        <Paragraph>
          No compartiremos sus datos personales con terceros, excepto en los
          siguientes casos:
        </Paragraph>
        <List>
          <li>
            Autoridades fiscales, administrativas o judiciales cuando así lo
            requiera la legislación vigente.
          </li>
          <li>
            Proveedores de servicios que actúan como encargados del tratamiento
            de datos, bajo estrictas medidas de confidencialidad.
          </li>
        </List>
        <SectionTitle>6. Derechos de los usuarios</SectionTitle>
        <Paragraph>Los usuarios tienen derecho a:</Paragraph>
        <List>
          <li>Acceder a sus datos personales.</li>
          <li>Rectificar datos inexactos o incompletos.</li>
          <li>
            Solicitar la eliminación de sus datos cuando ya no sean necesarios.
          </li>
          <li>Limitar u oponerse al tratamiento de sus datos.</li>
          <li>
            Solicitar la portabilidad de sus datos a otro responsable del
            tratamiento.
          </li>
          <li>
            Retirar el consentimiento en cualquier momento, sin afectar la
            licitud del tratamiento previo a su retirada.
          </li>
        </List>
        <Paragraph>
          Para ejercer estos derechos, puede ponerse en contacto con nosotros en
          jhonsebastianas@gmail.com
        </Paragraph>
        <SectionTitle>7. Conservación de los datos</SectionTitle>
        <Paragraph>
          Conservaremos sus datos personales únicamente durante el tiempo
          necesario para cumplir con las finalidades mencionadas o mientras
          exista una relación contractual o legal que lo justifique. Una vez
          finalizada, se procederá a su eliminación conforme a la normativa de
          protección de datos.
        </Paragraph>
        <SectionTitle>8. Medidas de seguridad</SectionTitle>
        <Paragraph>
          En el Sitio, implementamos medidas de seguridad técnicas y
          organizativas para proteger sus datos personales frente a accesos no
          autorizados, pérdida, alteración o divulgación.
        </Paragraph>
        {/* <SectionTitle>9. Uso de cookies</SectionTitle>
        <Paragraph>
          Nuestro sitio web utiliza cookies y tecnologías similares para mejorar
          la experiencia del usuario y analizar el uso de nuestros servicios.
          Puede obtener más información sobre el uso de cookies en
          https://institutodemarcapersonal.es/politica-de-cookies.
        </Paragraph> */}
        <SectionTitle>9. Cambios en la política de privacidad</SectionTitle>
        <Paragraph>
          Podemos actualizar esta política de privacidad para reflejar cambios
          en nuestras prácticas o en la legislación aplicable. Le recomendamos
          revisar periódicamente esta página para estar informado de cualquier
          modificación.
        </Paragraph>
      </Content>
    </Wrapper>
  );
};

export default PrivacyPolicy;

const Wrapper = styled.div`
  min-height: 100vh;
  width: 100%; // evita overflow horizontal
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background: radial-gradient(circle at bottom left, var(--first-color), #000);
  color: white;
`;

const Content = styled.div`
  max-width: 800px;
  width: 80%;
`;
const Title = styled.h1`
  text-align: center;
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  color: white;
  font-weight: 700;
`;

const SectionTitle = styled.h2`
  margin-top: 2rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
`;

const Paragraph = styled.p`
  margin-top: 0.75rem;
  line-height: 1.6;
  font-weight: 300; // texto más liviano
`;

const List = styled.ul`
  margin-top: 0.5rem;
  padding-left: 1.5rem;
  list-style: disc;

  li {
    margin-bottom: 0.5rem;
    font-weight: 300;
  }
`;
