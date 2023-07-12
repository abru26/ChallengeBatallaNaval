// Import global css here
import "../styles/global.scss";
import "../styles/storybook.scss";
import "bootstrap/dist/css/bootstrap.css";
import "../public/fonts/fonts.css";
import "bootstrap/dist/js/bootstrap";
import "@glidejs/glide/src/assets/sass/glide.core.scss";
import "@glidejs/glide/src/assets/sass/glide.theme.scss";
import { RouterContext } from "next/dist/shared/lib/router-context"; // next 12


export const parameters = {
  controls: { expanded: true },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
};

