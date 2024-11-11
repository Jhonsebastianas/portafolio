import Button from "@components/commons/button";
import BlogLayout from "@modules/blog/layouts/blog.layout";
import { toPng } from "html-to-image";
import { useRef, useState } from "react";
import QRCode from "react-qr-code";
import styled from "styled-components";

const ContainerStyled = styled.div`
  .content__form {
    margin-top: 1rem;
    display: flex;
    justify-content: center;

    .suscribe__action-content {
      text-align: center;
      margin-left: 0.25rem;

      .suscribe_action-botton {
        height: 82%;
        align-content: center;
        // margin: .75rem 1rem .25rem;
      }
    }

    @media screen and (max-width: 700px) {
      flex-direction: column;
    }
  }

  .contact__content {
    margin-bottom: 1rem;
    background-color: var(--input-color);
    border-radius: 0.5rem;
    padding: 0.75rem 1rem 0.25rem;
  }

  .contact__label {
    font-size: var(--smaller-font-size);
    color: var(--title-color);
  }

  .contact__input {
    width: 100%;
    background-color: var(--input-color);
    color: var(--text-color);
    font-family: var(--body-font);
    font-size: var(--normal-font-size);
    border: none;
    outline: none;
    padding: 0.25rem 0.5rem 0.5rem 0;
  }
`;

const ContainerCenterStyled = styled.div`
    text-align: center;
`;

const QrCodePage = () => {
  const [data, setData] = useState("https://www.jhonsebastianas.com/blog");
  const qrRef = useRef(null); // Referencia para capturar el nodo del QR

  const handleDownload = () => {
    if (qrRef.current) {
      toPng(qrRef.current)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "codigo-qr.png";
          link.click();
        })
        .catch((err) => {
          console.error("Error al descargar el código QR", err);
        });
    }
  };

  return (
    <BlogLayout>
      <div className="section">
        <div className="container">
          <ContainerStyled>
            <ContainerCenterStyled>
                <h1>Código QR</h1>
                <br></br>
                <div ref={qrRef}>
                    <QRCode value={data} />
                </div>
            </ContainerCenterStyled>
            <div style={{ marginTop: "2em" }}>
              <form className="content__form" onSubmit={(e) => e.preventDefault()}>
                <div className="contact__content">
                  <label htmlFor="subject" className="contact__label">
                    URL o data:{" "}
                  </label>
                  <input
                    type="email"
                    placeholder="Ingresa tu email"
                    className="contact__input"
                    name="email"
                    id="email"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    required
                  />
                </div>
                <div className="suscribe__action-content">
                  <Button
                    type="submit"
                    className="suscribe_action-botton"
                    onClick={handleDownload}
                  >
                    Descargar
                  </Button>
                </div>
              </form>
            </div>

            <br></br>
            <ContainerCenterStyled>
                <h2>Información en el QRCode</h2>
                <p>{data}</p>
            </ContainerCenterStyled>
          </ContainerStyled>
        </div>
      </div>
      {/* <div className="container section"></div> */}
      {/* <SuscribeLayout campaign={"newsletter"} /> */}
      {/* <div className="container section"></div> */}
    </BlogLayout>
  );
};

export default QrCodePage;
