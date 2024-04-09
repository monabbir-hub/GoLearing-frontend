import Head from "next/head";
import React from "react";
import GoTop from "./GoTop";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Head>
        <title>Go Learning</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta
          name="description"
          content="Go Learning - Lets create a Story
"
          key="description"
        />
        <meta
          property="og:url"
          content={process.env.NEXT_PUBLIC_Frontend_URI}
        ></meta>
        <meta
          name="og:title"
          property="og:title"
          content="Go Learning"
          key="title"
        ></meta>
        <meta
          property='og:description'
          content="Go Learning-Let's Learn"
        ></meta>
        <meta
          property='og:image'
          content='https://reza28.s3.ap-south-1.amazonaws.com/43272cf0-f891-11ec-8dd8-fc54f8e07ff6.go-learning-favicon.png'
        />
        <meta
          name='twitter:card'
          content='Go Learning-Let&#39;s Learn'
        ></meta>
      </Head>

      {children}

      <GoTop scrollStepInPx="100" delayInMs="10.50" />
    </React.Fragment>
  );
};

export default Layout;
