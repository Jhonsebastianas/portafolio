"use client";

import { useState, useRef } from "react";
import { toPng } from "html-to-image";
import QRCode from "react-qr-code";
import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fdf8f3;

  h1 {
    font-family: "Playfair Display", serif;
    font-size: 2rem;
    margin-bottom: 2rem;
    color: #4a6fa5;
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    width: 100%;
    max-width: 400px;

    label {
      display: flex;
      flex-direction: column;
      font-size: 0.95rem;
      font-weight: 500;
      color: #333;

      input {
        margin-top: 0.3rem;
        padding: 0.75rem;
        border-radius: 8px;
        border: 1px solid #ccc;
        font-size: 1rem;
        background: white;
        color: #333;
      }
    }

    button {
      padding: 0.9rem;
      border-radius: 8px;
      background-color: #b89d57;
      color: white;
      font-size: 1rem;
      border: none;
      cursor: pointer;
      margin-top: 1rem;

      &:hover {
        background-color: #a0824c;
      }
    }
  }

  .result {
    margin-top: 2rem;
    text-align: center;

    p {
      margin-bottom: 0.5rem;
    }

    a {
      color: #4a6fa5;
      text-decoration: underline;
      word-break: break-word;
      font-size: 0.95rem;
    }

    canvas {
      margin-top: 1rem;
    }
  }
`;

export default function GenerateInvitation() {
  const [nombre, setNombre] = useState("");
  const [adults, setAdults] = useState("");
  const [children, setChildren] = useState("");
  const [url, setUrl] = useState("");

  const qrRef = useRef(null);

  const downloadQRCode = () => {
    if (qrRef.current === null) return;

    toPng(qrRef.current)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "invitacion-qr.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("Error al generar la imagen del QR", err);
      });
  };

  const handleGenerate = (e) => {
    e.preventDefault();

    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    const fullUrl = `${baseUrl}/wedding/invitation?name=${encodeURIComponent(
      nombre
    )}&adults=${adults}&children=${children}`;
    setUrl(fullUrl);
  };

  return (
    <Container>
      <h1>Generar Invitación</h1>
      <form onSubmit={handleGenerate}>
        <label>
          Nombre del invitado o grupo
          <input
            type="text"
            placeholder="Ej: Juan y María"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </label>

        <label>
          Número de adultos
          <input
            type="number"
            placeholder="Ej: 2"
            inputMode="numeric"
            pattern="[0-9]*"
            value={adults}
            onChange={(e) => setAdults(e.target.value.replace(/\D/, ""))}
            required
          />
        </label>

        <label>
          Número de niños
          <input
            type="number"
            placeholder="Ej: 1"
            inputMode="numeric"
            pattern="[0-9]*"
            value={children}
            onChange={(e) => setChildren(e.target.value.replace(/\D/, ""))}
            required
          />
        </label>

        <button type="submit">Generar URL + QR</button>
      </form>

      {url && (
        <div className="result">
          <p>Comparte esta URL con el invitado:</p>
          <a href={url} target="_blank" rel="noopener noreferrer">
            {url}
          </a>
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <div
              ref={qrRef}
              style={{
                background: "white",
                padding: "1rem",
                display: "inline-block",
              }}
            >
              <QRCode value={url} size={200} />
            </div>
            <br />
            <button onClick={downloadQRCode} style={{ marginTop: "1rem" }}>
              Descargar QR
            </button>
          </div>
        </div>
      )}
    </Container>
  );
}
