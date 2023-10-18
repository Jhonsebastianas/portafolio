import Contacme from "@modules/grupo-universitario/components/Contactme";
import Element from "@modules/grupo-universitario/components/element";
import LayerAnimation from "@modules/grupo-universitario/components/layer-animation";
import Menu from "@modules/grupo-universitario/layouts/menu";
import SocialNetworks from "@modules/grupo-universitario/layouts/social-networks";
import { MainCSS } from "@modules/grupo-universitario/styles/grupo-universitario.css";
import React from "react";

export default function Contacto(props) {
    return (<MainCSS>
        <LayerAnimation />
        <section>
            <Menu activeMenu={"contacto"} />
            <Contacme />
            <SocialNetworks />
        </section>
    </MainCSS>);
}