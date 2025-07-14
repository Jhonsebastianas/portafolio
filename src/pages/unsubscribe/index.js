import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

const Container = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 2rem;
  font-family: 'Arial', sans-serif;
`;

const Title = styled.h1`
  font-size: 1.6rem;
  color: #333;
`;

const CampaignItem = styled.label`
  display: block;
  margin: 12px 0;
`;

const Button = styled.button`
  margin-top: 24px;
  padding: 10px 20px;
  background-color: #d32f2f;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

const Checkbox = styled.input`
  margin-right: 8px;
`;

export default function Unsubscribe() {
  const router = useRouter();
  const { email, token } = router.query;

  const [campaigns, setCampaigns] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Esperar a que router esté listo y los params estén definidos
    if (!router.isReady) return;

    // Validar params
    if (!email || !token) {
      setError("Faltan parámetros necesarios para gestionar tu suscripción.");
      setLoading(false);
      return;
    }

    const fetchCampaigns = async () => {
      try {
        const res = await fetch(`/api/unsubscribe?email=${email}&token=${token}`);
        if (!res.ok) throw new Error("Token inválido o expirado.");
        const data = await res.json();
        setCampaigns(data.campaigns || []);
        setSelected([]);
      } catch (err) {
        console.error(err);
        setError("Hubo un error cargando tus preferencias. El enlace podría haber expirado.");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, [router.isReady, email, token]);

  const toggleCampaign = (c) => {
    setSelected((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  };

  const handleSubmit = async () => {
    if (selected.length === 0) {
      setMessage("Selecciona al menos una campaña para darte de baja.");
      return;
    }

    try {
      const unsubscribeAll = selected.length === campaigns.length;
      const res = await fetch(`/api/unsubscribe?email=${email}&token=${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ unsubscribeAll, selectedCampaigns: selected }),
      });

      if (res.ok) {
        setMessage("Tus preferencias han sido actualizadas.");
      } else {
        setMessage("Hubo un problema al actualizar tus preferencias.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Ocurrió un error inesperado.");
    }
  };

  if (loading) return <Container>Cargando...</Container>;
  if (error) return <Container><p style={{ color: "red" }}>{error}</p></Container>;

  return (
    <Container>
      <Title>Gestiona tus suscripciones</Title>
      <p>Selecciona las campañas de las que te quieres dar de baja:</p>

      {campaigns.length === 0 && (
        <p style={{ color: "#777" }}>No se encontraron campañas activas.</p>
      )}

      {campaigns.map((c) => (
        <CampaignItem key={c}>
          <Checkbox
            type="checkbox"
            checked={selected.includes(c)}
            onChange={() => toggleCampaign(c)}
          />
          {c}
        </CampaignItem>
      ))}

      {campaigns.length > 0 && (
        <Button onClick={handleSubmit}>Actualizar preferencias</Button>
      )}

      {message && <p style={{ marginTop: "16px", color: "#333" }}>{message}</p>}
    </Container>
  );
}
