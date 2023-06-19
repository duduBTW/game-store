import { EditorContent } from "@tiptap/react";
import styled, { css } from "styled-components";
import getHtmlCss from "@/components/design-system/html";

export const StyledEditorContent = styled(EditorContent)(({ theme }) => {
  return css`
    .ProseMirror {
      background-color: transparent;
      border: ${theme.sizes.gaps["0.5"]} solid ${theme.colors.gray["800"]};
      outline: none;
      color: ${theme.colors.gray["100"]};
      padding: ${theme.sizes.gaps["4"]} ${theme.sizes.gaps["5"]};
      border-radius: ${theme.borderRadius.medium};
      min-height: ${theme.sizes.gaps["32"]};
      background-color: ${theme.colors.background.main};

      &:focus {
        border-color: ${theme.colors.brand.main};
      }

      &[data-error="true"] {
        border-color: ${theme.colors.red["800"]};
      }

      ${getHtmlCss(theme)}
    }
  `;
});

export const Container = styled.div(() => {
  return css`
    display: flex;
    flex-direction: column;
  `;
});
