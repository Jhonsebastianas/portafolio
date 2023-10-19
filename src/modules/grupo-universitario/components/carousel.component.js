import React from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import Gallery from 'react-image-gallery';

export default function CarouselComponent(props) {
  const images = [
    {
      original: "/images/grupo-universitario/actual.png",
      description: "Celebramos la victoria de quien tanto nos ha amado y valorado nuestra juventud 🤍",
    },
    {
      original: "/images/grupo-universitario/pascua.png",
      description: "❤️‍🔥Así se vió nuestra pascua juvenil❤️‍🔥",
    },
    {
      original: "/images/grupo-universitario/domingoRamos.png",
      description: "🌿DOMINGO DE RAMOS🌿",
    },
    {
      original: "/images/grupo-universitario/2019.png",
      description: "Para quienes la pedían...Foto oficial 2019 📷",
    },
  ];

  return (
    <div className="bulb">
      <Gallery items={images} />
    </div>
  );
}
