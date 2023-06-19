import { DefaultTheme, css } from "styled-components";
import { getTypographyStyles } from "../typography";

function geHtmlCss(theme: DefaultTheme) {
  return css`
    display: flex;
    flex-direction: column;
    gap: ${theme.sizes.gaps["2"]};

    h1 {
      ${getTypographyStyles({
        theme,
        color: "gray.100",
        fontFamily: "Rubik",
        lineHeight: "title",
        size: "2xl",
        weight: "bold",
      })}
    }

    p {
      ${getTypographyStyles({
        theme,
        color: "gray.100",
        fontFamily: "Nunito",
        lineHeight: "paragraph",
        size: "base",
        weight: "regular",
      })}
    }

    ul {
      padding-left: ${theme.sizes.gaps["4"]};
      margin: ${theme.sizes.gaps["1"]} 0;
    }
  `;
}

export default geHtmlCss;
