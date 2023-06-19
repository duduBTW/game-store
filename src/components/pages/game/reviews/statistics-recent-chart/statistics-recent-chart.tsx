import { useTheme } from "styled-components";
import { Group } from "@visx/group";
import { BarGroup } from "@visx/shape";
import { scaleBand, scaleLinear, scaleOrdinal } from "@visx/scale";

import {
  BarGroupKeyName,
  BarGroupRecentStatistics,
  Props,
} from "./statistics-recent-chart.props";

function StatisticsRecentChart({ width, height, reviews }: Props) {
  const theme = useTheme();

  const { reviewsGruppedByMonth } = reviews;

  // bounds
  const xMax = width - MARGIN.left - MARGIN.right;
  const yMax = height - MARGIN.top - MARGIN.bottom;

  const data = Object.entries(reviewsGruppedByMonth).map(([key, value]) => {
    return {
      ...value,
      date: key,
    };
  }, {});

  const colorScale = scaleOrdinal<string, string>({
    domain: KEYS,
    range: [theme.colors.blue["600"], theme.colors.red["600"]],
  });

  const dateScale = scaleBand<string>({
    domain: data.map(getDate),
    padding: 0.2,
  }).rangeRound([0, xMax]);

  const likeTypeScale = scaleBand<string>({
    domain: KEYS,
    padding: 0.2,
  }).rangeRound([0, dateScale.bandwidth()]);

  const valueScale = scaleLinear<number>({
    domain: [
      0,
      Math.max(
        ...data.map((d) => Math.max(...KEYS.map((key) => Number(d[key]))))
      ),
    ],
  }).range([yMax, 0]);

  return width < 10 ? null : (
    <svg width={width} height={height}>
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill="transparent"
        rx={14}
      />
      <Group top={MARGIN.top} left={MARGIN.left}>
        <BarGroup
          data={data}
          keys={KEYS}
          height={yMax}
          x0={getDate}
          x0Scale={dateScale}
          x1Scale={likeTypeScale}
          yScale={valueScale}
          color={colorScale}
        >
          {(barGroups) =>
            barGroups.map((barGroup) => (
              <Group
                key={`bar-group-${barGroup.index}-${barGroup.x0}`}
                left={barGroup.x0}
              >
                {barGroup.bars.map((bar) => (
                  <rect
                    key={`bar-group-bar-${barGroup.index}-${bar.index}-${bar.value}-${bar.key}`}
                    x={bar.x}
                    y={bar.y}
                    width={bar.width}
                    height={bar.height}
                    fill={bar.color}
                    rx={4}
                  />
                ))}
              </Group>
            ))
          }
        </BarGroup>
      </Group>
    </svg>
  );
}

// ----------
// Consts
const MARGIN = { top: 0, right: 0, bottom: 0, left: 0 };
const KEYS = ["likes", "deslikes"] as BarGroupKeyName[];

// ----------
// Helpers
// ----------
const getDate = (d: BarGroupRecentStatistics) => d.date;

export default StatisticsRecentChart;
