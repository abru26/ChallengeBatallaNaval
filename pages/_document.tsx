// react
import React from 'react';
// third-party
import Document, {
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
// application
import { baseUrl } from './../helpers/utils';

class MyDocument extends Document {
  render() {
    const googleCode = "-";
    return (
      <Html lang={"ES"}>
        <Head>
          <link rel="shortcut icon" href={baseUrl('favicon.ico')} />
          {/* fonts */}
          <link rel="stylesheet" href="/fonts/fonts.css" />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=G-${googleCode}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-${googleCode}', { page_path: window.location.pathname });
            `,
            }}
          />
        </Head>
        <body>
          { /* analytics HERE */}
          <div className="site-preloader">
            <style
              dangerouslySetInnerHTML={{
                __html: `
                                        #__next *,
                                        #__next *:before,
                                        #__next *:after {
                                           // transition-duration: 0s !important;
                                        }

                                        body {
                                            overflow: hidden !important;
                                            overflow-y: scroll !important;
                                            height: 100% !important;
                                        }
                                    `,
              }}
            />
          </div>

          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
