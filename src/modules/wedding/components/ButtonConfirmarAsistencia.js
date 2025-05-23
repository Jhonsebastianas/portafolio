import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Boton from "./ButtonStyle";

const ButtonConfirmarAsistencia = () => {
  const router = useRouter();
  const searchParams = router.query;
  const [name, setName] = useState("");
  const [adults, setAdults] = useState(0);

  useEffect(() => {
    const nameParam = decodeURIComponent(
      searchParams.name || "invitado especial"
    );
    const adultsParam = decodeURIComponent(searchParams.adults || 0);
    setName(nameParam);
    setAdults(adultsParam);
  }, [searchParams]);

  function getTextoEnviar() {
    if (adults < 1) {
      return encodeURIComponent(
        `Hola Naty, confirmo mi asistencia a la boda, soy ${name}, muchas gracias por la invitación`
      );
    }
    return encodeURIComponent(
      `Hola Naty, confirmo mi asistencia a la boda, somos ${name}, confirmo que asistiremos los ${adults}, muchas gracias por la invitación`
    );
  }
  return (
    <Boton
      href={`https://wa.me/3046588830?text=${getTextoEnviar()}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      Confirmar asistencia
    </Boton>
  );
};

export default ButtonConfirmarAsistencia;
