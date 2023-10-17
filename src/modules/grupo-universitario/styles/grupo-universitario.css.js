import styled from "styled-components";

export const MainCSS = styled.div`
    @import url('https://fonts.googleapis.com/css?family=PT+Sans+Narrow:400,700&display=swap');
    .open
    {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        z-index: 10000;
    }
    .open .layer
    {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transform-origin: top;
        animation: open 1s ease-in-out forwards;
    }
    .open .layer:nth-child(1) {
        background: #000;
        z-index: 2;
    }
    .open .layer:nth-child(2)
    {
        background: #2C4899;
        animation-delay: 1s;
        z-index: 1;
    }
    @keyframes open
    {
        0%
        {
            transform: scaleY(1);
        }
        100%
        {
            transform: scaleY(0);
        }
    }
    section {
        position: absolute;
        width: 100%;
        height: 100%;
        display: grid;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }
    .bannerText
    {
        position: absolute;
        top: 50%;
        left: 10%;
        transform: translateY(-50%);
        max-width: 700px;
        z-index: 1001;
    }
    .bannerText h2, .bannerText h3 {
        position: relative;
        margin: 0;
        padding: 0;
        display: inline-block;
        transform-origin: left;
        text-transform: uppercase;
        transform: scaleX(0);
        animation: revealTextReverse 1s ease-in-out forwards;
        color: #EAC40A;
    }
    .bannerText h2
    {
        font-size: 6em;
        animation-delay: 2s;
    }
    .bannerText h3
    {
        font-size: 3em;
        animation-delay: 3s;
    }
    .bannerText h2:before,
    .bannerText h3:before
    {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        background: #2C4899;
        width: 100%;
        height: 100%;
        transform-origin: right;
        animation: revealText 1s ease-in-out forwards;
        animation-delay: 3s;
    }
    .bannerText h3:before
    {
        animation-delay: 4s;
    }
    @keyframes revealText
    {
        0%
        {
            transform: scaleX(1);
        }
        100%
        {
            transform: scaleX(0);
        }
    }
    @keyframes revealTextReverse
    {
        0%
        {
            transform: scaleX(0);
        }
        100%
        {
            transform: scaleX(1);
        }
    }
    .bannerText p {
        opacity: 0;
        font-weight: 400;
        font-size: 1.2em;
        animation: fadeIn 1s linear forwards;
        animation-delay: 5s;
    }
    @keyframes fadeIn
    {
        0%
        {
            opacity: 0;
        }
        100%
        {
            opacity: 1;
        }
    }
    .bannerText a
    {
        opacity: 0;
        display: inline-block;
        margin: 20px 0 0;
        padding: 10px 20px;
        background: #2C4899;
        color: #fff;
        font-weight: 700;
        text-decoration: none;
        font-size: 1.2em;
        letter-spacing: 1px;
        animation: fadeInBottom 0.5s linear forwards;
        animation-delay: 5.5s;
    }
    @keyframes fadeInBottom
    {
        0%
        {
            transform: translateY(50px);
            opacity: 0;
        }
        100%
        {
            transform: translateY(0);
            opacity: 1;
        }
    }
    .bulb {
        position: absolute;
        right: 10%;
        top: 50%;
        transform: translateY(-50%);
        animation: fadeIn 1s linear forwards;
        animation-delay: 6s;
        z-index: 0;
    }
    .sci
    {
        position: absolute;
        bottom: 15px;
        right: 30px;
        display: flex;
        flex-direction: column;
    }
    .sci li
    {
        opacity: 0;
        list-style: none;
        padding: 10px 0;
        text-align: center;
        animation: fadeInBottom 0.5s linear forwards;
    }
    .header ul li:nth-child(1),
    .sci li:nth-child(1)
    {
        animation-delay: 5s;
    }
    .header ul li:nth-child(2),
    .sci li:nth-child(2)
    {
        animation-delay: 5.25s;
    }
    .header ul li:nth-child(3),
    .sci li:nth-child(3)
    {
        animation-delay: 5.5s;
    }
    .header ul li:nth-child(4),
    .sci li:nth-child(4)
    {
        animation-delay: 5.75s;
    }
    .header ul li:nth-child(5),
    .sci li:nth-child(5)
    {
        animation-delay: 6s;
    }
    .header ul li:nth-child(6),
    .sci li:nth-child(6)
    {
        animation-delay: 6.25s;
    }
    .sci li a
    {
        font-size: 1.2em;
        color: #000;
    }
    .header {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 80px;
        padding: 0 10%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        z-index: 10000;
    }
    .header .logo
    {
        color: #2C4899;
        opacity: 0;
        margin: 0;
        padding: 0;
        font-size: 2em;
        text-transform: uppercase;
        animation: fadeIn 0.5s linear forwards;
        animation-delay: 5s;
    }
    .header ul
    {
        margin: 0;
        padding: 0;
        z-index: 100;
        display: flex;
    }
    .header ul li
    {
        opacity: 0;
        list-style: none;
        margin: 0 10px;
        animation: fadeInRight 0.5s linear forwards;
    }
    .header ul li:last-child
    {
        margin-right: 0;
    }
    .header ul li a
    {
        text-decoration: none;
        font-size: 1.2em;
        color: #000;
        padding: 5px 10px;
        letter-spacing: 2px;
    }
    .header ul li a.active,
    .header ul li a:hover
    {
        background: #2C4899;
        color: #fff;
    }
    @keyframes fadeInRight
    {
        0%
        {
            transform: translateX(150px);
            opacity: 0;
        }
        100%
        {
            transform: translateX(0);
            opacity: 1;
        }
    }
    .element1
    {
        opacity: 0;
        position: absolute;
        bottom: -150px;
        right: 40%;
        width: 250px;
        height: 250px;
        border: 40px solid #2C4899;
        animation: rotate 40s linear infinite, fadeIn 1s linear forwards;
        animation-delay: 7s;
    }
    .element2
    {
        opacity: 0;
        position: absolute;
        left: -10px;
        top: 40%;
        width: 50px;
        height: 50px;
        border: 2px solid #2C4899;
        animation: rotate 30s linear infinite, fadeIn 1s linear forwards;
        animation-delay: 7s;
    }
    @keyframes rotate
    {
        0%
        {
            transform: rotate(45deg);
        }
        100%
        {
            transform: rotate(405deg);
        }
    }

    // Responsive
    @media(max-width: 1280px) {
        section: {
            height: auto !important;
            display: initial;
            padding: 100px;
            box-sizing: border-box;
        }
        .bannerText {
            position: relative;
            top: 0;
            left: 0;
            margin-top: 100px;
            transform: translateY(0);
            max-width: 700px;
            z-index: 1001;
        }
        .sci {
            z-index: 1002;
            right: 20px;
        }
    }

    .icon-menu-bars.x2, .icon-menu-times.x2 {
        font-size: 28px;
        cursor: pointer;
        display: none;
    }

    @media(max-width: 991px) {
        .bannerText h2 {
            font-size: 3rem;
        }
        .bannerText h3 {
            font-size: 1.5rem;
        }
        .element1 {
            display: none;
        }
        // Menú
        .header ul {
            position: fixed;
            background: #fff;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: none;
            z-index: 1010;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            overflow-y: scroll;
        }
        .header ul.show {
            display: flex;
        }
        .header ul li {
            margin: 10px 0;
        }
        .header ul li:nth-child(1),
        .header ul li:nth-child(2),
        .header ul li:nth-child(3),
        .header ul li:nth-child(4),
        .header ul li:nth-child(5),
        .header ul li:nth-child(6) {
            animation-delay: 0s !important;
        }
        .icon-menu-bars.x2 {
            font-size: 1.4rem;
            display: block;
        }
        .icon-menu-times.x2 {
            font-size: 1.4rem;
            position: absolute;
            top: 20px;
            right: 40px;
            display: block;
        }
    }

    @media(max-width: 991px) {
        section {
            padding: 50px 80px 50px 50px;
            overflow-y: scroll;
        }

        .header {
            padding: 0 50px;
        }

        .bulb {
            max-height: 700px;
            position: relative;
            right: 10%;
            top: 50%;
            transform: translateY(-50%);
            animation: fadeIn 1s linear forwards;
            animation-delay: 6s;
            z-index: 100;
        }
    }
`