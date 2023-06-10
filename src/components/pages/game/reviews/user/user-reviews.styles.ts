import Typography from "@/components/design-system/typography/typography";
import styled, { DefaultTheme, css } from "styled-components";
import { StatusProps as StyledStatusProps } from "./user-reviews.props";

export const UserReviewCardContainer = styled.div(({ theme }) => {
  return css`
    padding: ${theme.sizes.gaps["5"]};
    border-radius: ${theme.borderRadius.medium};
    border: ${theme.sizes.gaps.px} solid ${theme.colors.gray["800"]};
    margin-top: ${theme.sizes.gaps["5"]};

    &:hover {
      background-color: rgba(255, 255, 255, 0.02);
    }
  `;
});

export const UserReviewCardUpperPart = styled.header(({ theme }) => {
  return css`
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: ${theme.sizes.gaps["3"]};
    margin-bottom: ${theme.sizes.gaps["4"]};
  `;
});

export const UserName = styled(Typography)(() => {
  return css`
    text-align: end;
  `;
});

export const UserAvatar = styled.img(({ theme }) => {
  return css`
    width: ${theme.sizes.gaps["10"]};
    height: ${theme.sizes.gaps["10"]};
    border-radius: ${theme.borderRadius.round};
  `;
});

export const Status = styled.div<StyledStatusProps>(
  ({ theme, styledStatus }) => {
    let statusColor: keyof DefaultTheme["colors"] = "gray";

    switch (styledStatus) {
      case "liked":
        statusColor = "blue";
        break;
      case "desliked":
        statusColor = "red";
        break;
    }

    return css`
      display: grid;
      place-items: center;
      width: ${theme.sizes.gaps["10"]};
      height: ${theme.sizes.gaps["10"]};
      border-radius: ${theme.borderRadius.round};
      background-color: ${theme.colors[statusColor]["900"]};
      color: ${theme.colors[statusColor]["100"]};
    `;
  }
);

export const UserReviewCardFeedback = styled.div(({ theme }) => {
  return css`
    display: inline-flex;
    margin-top: ${theme.sizes.gaps["5"]};
    gap: ${theme.sizes.gaps["2"]};
  `;
});

export const StyledUserReviewFeedbackButton = styled.button(({ theme }) => {
  return css`
    padding: 0 ${theme.sizes.gaps["3"]};
    height: ${theme.sizes.gaps["6"]};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${theme.sizes.gaps["2"]};
    border: ${theme.sizes.gaps.px} solid ${theme.colors.blueGray["800"]};
    border-radius: ${theme.borderRadius.round};

    &:hover {
      cursor: pointer;
      background-color: ${theme.colors.blueGray["900"]};
    }
  `;
});
