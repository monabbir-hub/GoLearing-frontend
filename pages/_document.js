import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="zxx">
        <Head>
          <link
            rel="icon"
            type="image/png"
            href="/images/go-learning-favicon.png"
          ></link>
        </Head>
        <body>
          <div id="modal" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
