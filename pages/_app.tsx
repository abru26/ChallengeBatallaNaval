import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/global.scss";

function MyApp({ Component, pageProps }) {

  React.useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <Component {...pageProps} />
  );
}

export default MyApp;