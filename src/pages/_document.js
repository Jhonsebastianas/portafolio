import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    {/** FavIcon */}
                    <link rel="icon" href="/favicon.ico" />
                    {/** WebFont */}
                    <link rel="stylesheet" href="https://unicons.iconscout.com/release/v3.0.6/css/line.css" />
                    {/** stylesheets */}
                    {/*manifest.json provides metadata used when your web app is installed on a
             user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/ */}
                    <link rel="manifest" href="/manifest.json" />
                    {/** Google Fonts */}
                    <link
                        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Great+Vibes&display=swap"
                        rel="stylesheet"
                    />
                    <link href="https://fonts.googleapis.com/css2?family=Updock&display=swap" rel="stylesheet" />
                    <link href="https://fonts.googleapis.com/css2?family=Luxurious+Script&display=swap" rel="stylesheet" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Parisienne&display=swap"
                        rel="stylesheet"
                    />
                    {/** scripts */}
                </Head>
                <body className="my-body-class">
                    {/* <!-- swiper --> */}
                    <script src="/js/swiper-bundle.min.js"></script>
                    <script src="/js/mixitup.min.js"></script>
                    {/* APP */}
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

MyDocument.getInitialProps = async (ctx) => {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: (App) => (props) =>
                    sheet.collectStyles(<App {...props} />),
            })

        const initialProps = await Document.getInitialProps(ctx)
        return {
            ...initialProps,
            styles: (
                <>
                    {initialProps.styles}
                    {sheet.getStyleElement()}
                </>
            ),
        }
    } finally {
        sheet.seal()
    }
}

export default MyDocument