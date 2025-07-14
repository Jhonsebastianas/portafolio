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

  useEffect(() => {
    if (email && token) {
      fetch(`/api/unsubscribe?email=${email}&token=${token}`)
        .then((res) => res.json())
        .then((data) => {
          setCampaigns(data.campaigns);
          setSelected([]);
          setLoading(false);
        })
        .catch(() => {
          setMessage("Hubo un error cargando tus preferencias.");
          setLoading(false);
        });
        setLoading(false);
    }
  }, [email, token]);

  const toggleCampaign = (c) => {
    setSelected((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  };

  const handleSubmit = async () => {
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
  };

  if (loading) return <Container>Cargando...</Container>;

  return (
    <Container>
      <Title>Gestiona tus suscripciones</Title>
      <p>Selecciona las campañas de las que te quieres dar de baja:</p>

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

      <Button onClick={handleSubmit}>Actualizar preferencias</Button>

      {message && <p>{message}</p>}
    </Container>
  );
}