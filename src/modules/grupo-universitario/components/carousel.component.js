import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function CarouselComponent(props) {
  const getConfigurableProps = () => ({
    dynamicHeight: true,
  });

  return (
    <Carousel className="bulb" {...getConfigurableProps()}>
      <div>
        <img src="/images/grupo-universitario/actual.png" />
        <p className="legend">Celebramos la victoria de quien tanto nos ha amado y valorado nuestra juventud 🤍</p>
      </div>
      <div>
        <img src="/images/grupo-universitario/pascua.png" />
        <p className="legend">❤️‍🔥Así se vió nuestra pascua juvenil❤️‍🔥</p>
      </div>
      <div>
        <img src="/images/grupo-universitario/domingoRamos.png" />
        <p className="legend">🌿DOMINGO DE RAMOS🌿</p>
      </div>
      <div>
        <img src="/images/grupo-universitario/2019.png" />
        <p className="legend">Para quienes la pedían...Foto oficial 2019 📷</p>
      </div>
    </Carousel>
  );
}