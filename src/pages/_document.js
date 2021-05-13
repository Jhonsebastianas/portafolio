import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    render() {
        return (
            <Html lang="es">
                <Head>
                    {/** FavIcon */}
                    <link rel="icon" href="/favicon.ico" />
                    {/** WebFont */}
                    <link rel="stylesheet" href="https://unicons.iconscout.com/release/v3.0.6/css/line.css" />
                    {/** stylesheets */}
                    {/*manifest.json provides metadata used when your web app is installed on a
             user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/ */}
                    <link rel="manifest" href="/manifest.json" />
                    {/** scripts */}
                </Head>
                <body className="my-body-class">
                    <Main />
                    <NextScript />
                    {/* <!-- Materialize --> */}
                </body>
            </Html>
        )
    }
}

export default MyDocument