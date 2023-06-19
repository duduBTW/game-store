import Typography from "@/components/design-system/typography/typography";
import { Props } from "./reviews-statistics.props";
import {
  ChartContainer,
  ReviewStatistcsContainer,
  TotalContainer,
  TitleContainer,
} from "./reviews-statistics.styles";
import { TypographyColor } from "@/components/design-system/typography/typography.props";

function ReviewStatistcs({ ratio, title, total, chart, ...rest }: Props) {
  return (
    <ReviewStatistcsContainer {...rest}>
      <TitleContainer>
        <Typography size="sm" weight="bold" color="gray.300">
          {title}
        </Typography>
      </TitleContainer>

      <TotalContainer>
        <Typography
          color={getRatioColor(ratio)}
          fontFamily="Rubik"
          size="xl"
          weight="bold"
        >
          {getRatioLabel(ratio)} ({total})
        </Typography>
      </TotalContainer>

      <ChartContainer>{chart}</ChartContainer>
    </ReviewStatistcsContainer>
  );
}

// Helpers
function getRatioLabel(ratio: number) {
  if (ratio >= 0.8) {
    return "Very positive";
  }

  if (ratio >= 0.6) {
    return "Positive";
  }

  if (ratio <= 0.4) {
    return "Negative";
  }

  if (ratio <= 0.2) {
    return "Very negative";
  }

  return "Neutral";
}

function getRatioColor(ratio: number): TypographyColor {
  if (ratio >= 0.6) {
    return "blue.400";
  }

  if (ratio <= 0.4) {
    return "red.400";
  }

  return "gray.400";
}

export default ReviewStatistcs;
