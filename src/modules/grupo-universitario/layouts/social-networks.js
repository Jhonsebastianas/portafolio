import React from "react";

export default function SocialNetworks(props) {
  const URL_WHATSAPP = "https://wa.me/3177383697?text=¡Hola%20Hender!%20Estoy%20interesado%20en%20unirme%20al%20Grupo%20Universitario%20San%20Juan%20Pablo%20II.%20Me%20emociona%20la%20idea%20de%20combinar%20mi%20educación%20universitaria%20con%20la%20fe%20y%20los%20valores%20que%20representan.%20¿Puedes%20brindarme%20más%20información%20sobre%20cómo%20puedo%20unirme%20y%20participar%20en%20este%20inspirador%20viaje%20académico%20y%20espiritual?%20También,%20¿cuándo%20y%20dónde%20se%20llevan%20a%20cabo%20las%20reuniones?%20Gracias.";
  const URL_INSTAGRAM = "https://www.instagram.com/cjsjpii/";
  return (
    <ul className="sci">
      <li><a target="_blank" href={URL_INSTAGRAM}><i className="uil uil-instagram"></i></a></li>
      <li><a target="_blank" href={URL_WHATSAPP}><i className="uil uil-whatsapp"></i></a></li>
    </ul>
  );
}